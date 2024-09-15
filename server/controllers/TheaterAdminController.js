import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import MasterAdminModel from "../models/MasterAdmin.js";

async function loginTheaterAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isMasterAdmin = await MasterAdminModel.findOne({ email });
    if (isMasterAdmin) {
      return res.status(401).json({ message: "Master admin email!" });
    }

    const existingTheaterAdmin = await TheaterAdminModel.findOne({ email });
    if (!existingTheaterAdmin) {
      return res.status(404).json({ message: "Theater Admin not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingTheaterAdmin.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: existingTheaterAdmin._id,
        email: existingTheaterAdmin.email,
        name: existingTheaterAdmin.name,
        role: existingTheaterAdmin.role
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

    existingTheaterAdmin.password = undefined;

    res.status(200).json({
      message: "Theater admin login successful",
      TheaterAdmin: existingTheaterAdmin
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while login" });
  }
}

export { loginTheaterAdmin };
