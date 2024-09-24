import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TheaterAdminModel from "../models/TheaterAdmin.js";
import otpModel from "../models/OTP.js";
import SeatModel from "../models/Seat.js";
import SeatCategoryModel from "../models/SeatCategory.js";
import mailSender from "../utils/SendMail.js";
import generateOtp from "../utils/generateOtp.js";
import ScreenModel from "../models/Screen.js";
import ScheduleModel from "../models/Schedule.js";

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
    const theaterAdmin = await TheaterAdminModel.findById(id).populate(
      "screens"
    );
    if (!theaterAdmin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const isExist = theaterAdmin.screens.find(
      (item) => item.screenName === screenName
    );

    if (isExist) {
      return res.status(400).json({ message: "Screen already exist" });
    }

    const newScreen = new ScreenModel({
      screenName,
      screenType,
      theater: id
    });
    theaterAdmin.screens.push(newScreen._id);

    await newScreen.save();
    await theaterAdmin.save();

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
    const screens = await ScreenModel.find({ theater: id }).populate({
      path: "category",
      populate: {
        path: "layout.seats",
        model: "Seat"
      }
    });
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

    const hasChanges =
      (screenName && screen.screenName !== screenName) ||
      (screenType && screen.screenType !== screenType);

    if (!hasChanges) {
      return res.status(200).json({ message: "Nothing to update" });
    }

    if (screenName && screen.screenName !== screenName)
      screen.screenName = screenName;
    if (screenType && screen.screenType !== screenType)
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

    await TheaterAdminModel.findByIdAndUpdate(screen.theater, {
      $pull: { screens: screenid }
    });

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

async function reArrangeRows(screen) {
  const list = await ScreenModel.findById(screen).select("category");
  const categories = await SeatCategoryModel.find({
    _id: { $in: list.category }
  });
  let startRow = 65;
  let countCapacity = 0;
  const updatePromises = categories.map((category) => {
    category.layout.map((layout) => {
      layout.row = String.fromCharCode(startRow++);
      countCapacity += layout.seats.length;
    });
    return category.save();
  });
  await ScreenModel.findByIdAndUpdate(screen, { capacity: countCapacity });
  await Promise.all(updatePromises);
}

async function generateLayout(category, screen, row, seatsPerRow) {
  await SeatModel.deleteMany({ category });
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

function arraysHaveSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.sort().toString() === arr2.sort().toString();
}

function validGaps(gaps) {
  let valid = true;
  for (let i = 0; i < gaps.length; i++) {
    if (!(gaps[i] >= 0 && gaps[i] <= 30)) {
      valid = false;
      break;
    }
  }
  return valid;
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

    let isUpdated = false;
    if (name && name != category.name) {
      category.name = name;
      isUpdated = true;
    }

    if (price && price !== category.price) {
      if (price < 0) {
        return res.status(400).json({ message: "Price cannot be negative!" });
      }
      if (price > 5000) {
        return res.status(400).json({ message: "Maximum price ₹5000!" });
      }
      category.price = price;
      isUpdated = true;
    }
    if (rows && rows !== category.rows) {
      if (rows < 0) {
        return res.status(400).json({ message: "Rows cannot be negative!" });
      }
      if (rows > 10) {
        return res.status(400).json({ message: "Maximum 10 rows!" });
      }
      category.rows = rows;
      isUpdated = true;
    }

    let gapList = gaps
      ? gaps.split(",").filter((gap) => gap.trim() !== "")
      : [];
    if (!validGaps(gapList)) {
      return res.status(400).json({ message: "Invalid Gaps!" });
    }
    if (gapList.length === 0 && category.gaps.length === 0) {
    } else if (!arraysHaveSameElements(gapList, category.gaps)) {
      category.gaps = gapList;
      isUpdated = true;
    }

    if (seatsPerRow && seatsPerRow !== category.seatsPerRow) {
      if (seatsPerRow < 0) {
        return res.status(400).json({ message: "Seats cannot be negative!" });
      }
      if (seatsPerRow > 30) {
        return res.status(400).json({ message: "Maximum 30 seats!" });
      }
      category.seatsPerRow = seatsPerRow;
      isUpdated = true;
    }

    if (isUpdated === false) {
      return res.status(400).json({ message: "No changes detected" });
    }

    let shouldUpdateLayout = false;
    if (
      (rows && rows !== category.rows) ||
      (seatsPerRow && seatsPerRow !== category.seatsPerRow)
    ) {
      shouldUpdateLayout = true;
    }

    if (shouldUpdateLayout) {
      const layout = await generateLayout(
        categoryid,
        category.screen,
        rows,
        seatsPerRow
      );
      category.layout = layout;
    }

    await category.save();
    await reArrangeRows(category.screen);

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating category" });
  }
}

async function deleteCategory(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { categoryid } = req.params;
  try {
    const category = await SeatCategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await SeatModel.deleteMany({ category: categoryid });
    await ScreenModel.findByIdAndUpdate(category.screen, {
      $pull: { category: categoryid }
    });
    await SeatCategoryModel.findByIdAndDelete(categoryid);
    return res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting category" });
  }
}

async function getAvailableScreens(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const screens = await ScreenModel.find({ theater: req.id });
    if (!screens || screens.length === 0) {
      return res
        .status(404)
        .json({ message: "Screens not found", screens: [] });
    }

    const { startTime, endTime, date, screenType } = req.body;

    let unavailableScreens = [];

    if (date && startTime && endTime) {
      let sTime = new Date(date);
      sTime.setHours(startTime.split(":")[0]);
      sTime.setMinutes(startTime.split(":")[1]);

      let eTime = new Date(date);
      eTime.setHours(endTime.split(":")[0]);
      eTime.setMinutes(endTime.split(":")[1]);

      const schedules = await ScheduleModel.find({
        $or: [
          { startTime: { $lte: eTime, $gte: sTime } },
          { endTime: { $gte: sTime, $lte: eTime } },
          { startTime: { $lte: sTime }, endTime: { $gte: eTime } }
        ]
      }).select({ screen: 1, _id: 0 });

      // for (const item of schedules) {
      //   if (
      //     (sTime >= item.startTime && sTime <= item.endTime) ||
      //     (eTime >= item.startTime && eTime <= item.endTime)
      //   ) {
      //     unavailableScreens.push(item.screen);
      //   }
      // }

      unavailableScreens = schedules.map((item) => item.screen.toString());
    }

    let filteredScreens = [];

    for (const scr of screens) {
      let obj = {
        _id: scr._id,
        screenName: scr.screenName,
        screenType: scr.screenType,
        isAvailable: scr.screenType === screenType,
        capacity: scr.capacity
      };

      if (unavailableScreens.includes(scr._id.toString())) {
        obj.isAvailable = false;
      }
      filteredScreens.push(obj);
    }

    return res
      .status(200)
      .json({ message: "Screens found", screens: filteredScreens });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching screens", screens: [] });
  }
}

async function addSchedule(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { scheduleData } = req.body;
  try {
    if (
      !scheduleData.selectedMovie ||
      !scheduleData.startTime ||
      !scheduleData.endTime ||
      !scheduleData.date ||
      !scheduleData.screenType ||
      !scheduleData.language ||
      !scheduleData.selectedScreen
    ) {
      return res.status(400).json({ message: "Invalid data" });
    }

    let startTime = new Date(scheduleData.date);
    startTime.setHours(scheduleData.startTime.split(":")[0]);
    startTime.setMinutes(scheduleData.startTime.split(":")[1]);

    let endTime = new Date(scheduleData.date);
    endTime.setHours(scheduleData.endTime.split(":")[0]);
    endTime.setMinutes(scheduleData.endTime.split(":")[1]);

    const newSchedule = new ScheduleModel({
      ...scheduleData,
      screen: scheduleData.selectedScreen._id,
      theater: req.id,
      movie: scheduleData.selectedMovie._id,
      startTime,
      endTime,
      nextShowTime: new Date(endTime.getTime() + 15 * 60 * 1000),
      totalSeats: scheduleData.selectedScreen.capacity
    });
    await newSchedule.save();
    return res
      .status(200)
      .json({ message: "Schedule added successfully", schedule: newSchedule });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding schedule", error: error.message });
  }
}

async function getFilteredSchedules(req, res) {
  const { role } = req;
  if (role !== "theateradmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { filteredData } = req.body;
  try {
    let schedules;
    if (filteredData.sort === "sort by start time") {
      schedules = await ScheduleModel.find({
        theater: req.id,
        date: filteredData.date
      })
        .sort({ startTime: 1 })
        .populate("movie")
        .populate({
          path: "screen",
          populate: {
            path: "category",
            populate: {
              path: "layout.seats"
            }
          }
        });
    } else if (filteredData.sort === "sort by end time") {
      schedules = await ScheduleModel.find({
        theater: req.id,
        date: filteredData.date
      })
        .sort({ startTime: -1 })
        .populate("movie")
        .populate({
          path: "screen",
          populate: {
            path: "category",
            populate: {
              path: "layout.seats"
            }
          }
        });
    }
    return res.status(200).json({ message: "Schedules found", schedules });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching schedules", schedules: [] });
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
  updateCategory,
  deleteCategory,
  getAvailableScreens,
  addSchedule,
  getFilteredSchedules
};
