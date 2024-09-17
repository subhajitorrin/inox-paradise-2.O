import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import MasterAdmin from "../models/MasterAdmin.js";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import generateOtp from "../utils/generateOtp.js";
import otpModel from "../models/OTP.js";
import mailSender from "../utils/SendMail.js";

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

async function sendOTPforTheaterRegistration(req, res) {
  const { role } = req;
  if (role !== "masteradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingTheaterAdmin = await TheaterAdminModel.findOne({ email });
    if (existingTheaterAdmin) {
      return res.status(404).json({ message: "Theater Admin already present" });
    }

    const otp = generateOtp(5);

    const newOtp = await otpModel.create({
      email,
      otp
    });

    await newOtp.save();

    const obj = {
      email: email,
      title: `${name} Theater Registration`,
      body: `Your OTP is ${otp}`
    };

    await mailSender(obj.email, obj.title, obj.body);

    return res
      .status(200)
      .json({ message: "Otp send successfully", otpid: newOtp._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error register admin" });
  }
}

async function addTheaterAdmin(req, res) {
  const { role } = req;
  if (role !== "masteradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { email, password, name, address, otpId, otp } = req.body;

  if (!email || !password || !name || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isCorrectOtp = await otpModel.findById(otpId);
    if (!isCorrectOtp) {
      return res.status(400).json({ message: "Otp expired, Send again!" });
    }

    if (isCorrectOtp.otp !== otp) {
      return res.status(400).json({ message: "Wrong otp" });
    }

    const existingTheater = await TheaterAdminModel.findOne({ email });
    if (existingTheater) {
      return res.status(409).json({ message: "Theater Admin already exists" });
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    const newTheater = new TheaterAdminModel({
      email,
      password: hashedpassword,
      name,
      address
    });

    await newTheater.save();

    newTheater.password = undefined;

    return res.status(201).json({
      message: "Theater added successfully",
      theater: newTheater
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while adding theater admin" });
  }
}

async function getMasterAdmin(req, res) {
  const { role } = req;
  if (role !== "masteradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { id } = req;
    const masterAdmin = await MasterAdmin.findById(id);
    if (!masterAdmin) {
      return res.status(404).json({ message: "Master Admin not found" });
    }
    return res.status(200).json({ message: "Master Admin found", masterAdmin });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while getting master admin" });
  }
}

async function getAllTheaters(req, res) {
  const { role } = req;
  if (role !== "masteradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("elo");
  
  try {
    const theaters = await TheaterAdminModel.find({});
    return res.status(200).json({ theaters });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while getting all theaters" });
  }
}

export {
  loginMasterAdmin,
  addTheaterAdmin,
  getMasterAdmin,
  sendOTPforTheaterRegistration,
  getAllTheaters
};
