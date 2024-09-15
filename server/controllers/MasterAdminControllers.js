import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import MasterAdmin from "../models/MasterAdmin.js";
import TheaterAdminModel from "../models/TheaterAdmin.js";

dotenv.config();

async function loginMasterAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const masterAdmin = await MasterAdmin.findOne({ email });
    if (!masterAdmin) {
      return res.status(404).json({ message: "Master Admin not found" });
    }

    if (masterAdmin.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: masterAdmin._id,
        email: masterAdmin.email,
        role: masterAdmin.role,
        name: masterAdmin.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None"
    });

    masterAdmin.password = undefined;

    return res.status(200).json({ message: "Login successful", masterAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while login master admin" });
  }
}

async function addTheaterAdmin(req, res) {
  const { role } = req;

  if (role !== "masteradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingTheater = await TheaterAdminModel.findOne({ email });
    if (existingTheater) {
      return res.status(409).json({ message: "Theater Admin already exists" });
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    const newTheater = new TheaterAdminModel({
      email,
      password: hashedpassword,
      name
    });

    await newTheater.save();

    newTheater.password = undefined;

    return res.status(201).json({
      message: "Theater Admin added successfully",
      theater: newTheater
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while adding theater admin" });
  }
}

export { loginMasterAdmin, addTheaterAdmin };
