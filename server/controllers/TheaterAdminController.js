import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import MasterAdminModel from "../models/MasterAdmin.js";
import otpModel from "../models/OTP.js";
import mailSender from "../utils/SendMail.js";
import generateOtp from "../utils/generateOtp.js";

async function loginTheaterAdminWithOtp(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
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

    const otp = generateOtp(5);

    const newOtp = await otpModel.create({
      email: existingTheaterAdmin.email,
      otp: otp
    });

    await newOtp.save();

    const obj = {
      email: existingTheaterAdmin.email,
      title: `${existingTheaterAdmin.name} Login OTP`,
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

async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Logout successful", success: true });
  } catch (error) {
    console.error("Error while logging out user", error);
    return res
      .status(500)
      .json({ msg: "Error while logging out user", error, success: false });
  }
}

async function getTheaterAdmin(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req;
  try {
    const theaterAdmin = await TheaterAdminModel.findById(id);
    if (!theaterAdmin) {
      return res.status(404).json({ message: "Theater Admin not found" });
    }
    return res
      .status(200)
      .json({ message: "Theater Admin found", theaterAdmin: theaterAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetchinig admin" });
  }
}

export {
  loginTheaterAdminWithOtp,
  verifyOtpForTheaterAdmin,
  logout,
  getTheaterAdmin
};
