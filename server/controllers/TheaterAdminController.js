import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import MasterAdminModel from "../models/MasterAdmin.js";
import otpModel from "../models/OTP.js";
import mailSender from "../utils/SendMail.js";

async function loginTheaterAdmin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isMasterAdmin = await MasterAdminModel.findOne({ email });
    if (isMasterAdmin) {
      return res.status(401).json({ message: "Can't login as master admin!" });
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

async function loginTheaterAdminWithOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingTheaterAdmin = await TheaterAdminModel.findOne({ email });
    if (!existingTheaterAdmin) {
      return res.status(404).json({ message: "Theater Admin not found" });
    }

    const otp = generateOtp(5);

    const newOtp = await otpModel.create({
      email: existingTheaterAdmin.email,
      otp: otp
    });

    await newOtp.save();

    const obj = {
      email: existingTheaterAdmin.email,
      title: "OTP for INOX PARADISE",
      body: `Your OTP is ${otp}`
    };

    await mailSender(obj.email, obj.title, obj.body);

    return res
      .status(200)
      .json({ message: "Otp send successfully", otpid: newOtp._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while login theater admin with otp" });
  }
}

async function verifyOtpForTheaterAdmin(req, res) {
  const { email, otpid, otp } = req.body;

  if (!email || !otpid || !otp) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingTheaterAdmin = await TheaterAdminModel.findOne({ email });
    if (!existingTheaterAdmin) {
      return res.status(404).json({ message: "Theater Admin not found" });
    }

    const existingOtp = await otpModel.findById(otpid);
    if (!existingOtp) {
      return res.status(400).json({ message: "Otp expired, send again" });
    }

    if (existingOtp.otp !== otp) {
      return res.status(400).json({ message: "Wrong otp" });
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

    return res.status(200).json({
      message: "Otp verified successfully",
      theaterAdmin: existingTheaterAdmin
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while verifying otp theater admin" });
  }
}

function generateOtp(n) {
  const firstDigit = Math.floor(Math.random() * 9) + 1;
  const remainingDigits = Math.floor(Math.random() * Math.pow(10, n - 1));
  const otp = firstDigit * Math.pow(10, n - 1) + remainingDigits;
  return otp;
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
}

export {
  loginTheaterAdmin,
  loginTheaterAdminWithOtp,
  verifyOtpForTheaterAdmin,
  logout
};