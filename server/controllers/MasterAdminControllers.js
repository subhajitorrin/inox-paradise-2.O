import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import MasterAdmin from "../models/MasterAdmin.js";

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

    const user = {
      id: masterAdmin._id,
      email: masterAdmin.email,
      role: masterAdmin.role,
      name: masterAdmin.name
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30d" });

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

export { loginMasterAdmin };
