import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import MasterAdminModel from "../models/MasterAdmin.js";
import otpModel from "../models/OTP.js";
import SeatModel from "../models/Seat.js";
import SeatCategoryModel from "../models/SeatCategory.js";
import mailSender from "../utils/SendMail.js";
import generateOtp from "../utils/generateOtp.js";
import ScreenModel from "../models/Screen.js";

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
      .json({ message: "Theater Admin found", theaterAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetchinig admin" });
  }
}

async function addScreen(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { screenName, screenType } = req.body;
  if (!screenName || !screenType) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const { id } = req;
    const theaterAdmin = TheaterAdminModel.findById(id);
    if (!theaterAdmin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const newScreen = new ScreenModel({
      screenName,
      screenType,
      theater: id
    });

    await newScreen.save();

    return res.status(200).json({
      message: "Screen added successfully",
      screen: newScreen
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding screen" });
  }
}

async function getScreens(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req;
  try {
    const screens = await ScreenModel.find({ theater: id }).populate(
      "category"
    );
    if (!screens) {
      return res.status(404).json({ message: "Screens not found" });
    }
    return res.status(200).json({ message: "Screens found", screens });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetchinig screens" });
  }
}

async function addCategory(req, res) {
  const { role } = req;

  // Check if the user is authorized to add a category
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const { screenid } = req.params;
    const screen = await ScreenModel.findById(screenid);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    const newCategory = new SeatCategoryModel({
      name: categoryName,
      screen: screenid,
      price: 0,
      gaps: [],
      layout: []
    });

    await newCategory.save();
    screen.category.push(newCategory._id);
    await screen.save();

    return res
      .status(200)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error fetching screen:", error);

    // Handle database connection or query errors
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
}

async function updateScreen(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { screenName, screenType } = req.body;
  if (!screenName && !screenType) {
    return res.status(400).json({ message: "Fields are required" });
  }
  try {
    const { screenid } = req.params;
    const screen = await ScreenModel.findById(screenid);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    screen.screenName = screenName;
    screen.screenType = screenType;

    await screen.save();

    return res
      .status(200)
      .json({ message: "Screen updated successfully", screen });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating screen" });
  }
}

async function deleteScreen(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { screenid } = req.params;
  try {
    const screen = await ScreenModel.findByIdAndDelete(screenid);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    // check if any schedule running

    await SeatModel.deleteMany({ screen: screenid });

    await SeatCategoryModel.deleteMany({ screen: screenid });

    await ScreenModel.findByIdAndDelete(screenid);

    return res
      .status(200)
      .json({ message: "Screen deleted successfully", screen });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting screen" });
  }
}

async function generateSeats(category, screen, n, rowName) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const seat = new SeatModel({
      row: rowName,
      seatNumber: i + 1,
      category,
      screen
    });
    await seat.save();
    list.push(seat._id);
  }
  return list;
}

async function generateLayout(category, screen, row, seatsPerRow) {
  const list = [];
  for (let i = 0; i < row; i++) {
    const rowName = String.fromCharCode(65 + i);
    const seats = await generateSeats(category, screen, seatsPerRow, rowName);
    const obj = {
      row: rowName,
      seats
    };
    list.push(obj);
  }
  return list;
}

async function updateCategory(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { name, rows, price, seatsPerRow, gaps } = req.body;
  if (!name && !rows && !price && !seatsPerRow && !gaps) {
    return res.status(400).json({ message: "Fields are required" });
  }

  const { categoryid } = req.params;
  try {
    const category = await SeatCategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.price = price;
    category.name = name;
    category.rows = rows;
    category.seatsPerRow = seatsPerRow;
    if (gaps) category.gaps = gaps.split(",");
    const layout = await generateLayout(
      categoryid,
      category.screen,
      rows,
      seatsPerRow
    );
    category.layout = layout;
    await category.save();

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating category" });
  }
}
export {
  loginTheaterAdminWithOtp,
  verifyOtpForTheaterAdmin,
  logout,
  getTheaterAdmin,
  addScreen,
  getScreens,
  addCategory,
  updateScreen,
  deleteScreen,
  updateCategory
};
