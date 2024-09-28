import generateOtp from "../utils/generateOtp.js";
import mailSender from "../utils/SendMail.js";
import OtpModel from "../models/OTP.js";
import UserModel from "../models/User.js";
import ScheduleModel from "../models/Schedule.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import TicketModel from "../models/Ticket.js";
import BookingSuccessEmailSend from "../utils/BookingSuccessEmailSend.js";
import generateRandomString from "../utils/GenerateBookingId.js";

async function sendOtp(req, res) {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const generatedOtp = generateOtp(5);

    const existingOtp = await OtpModel.findOne({ email });
    if (existingOtp) {
      await existingOtp.deleteOne();
    }
    const newOtp = new OtpModel({
      email,
      otp: generatedOtp
    });
    await newOtp.save();

    const title = "OTP for INOX PARADISE";
    const emailBody = `
    <html>
      <body>
        <h2>Welcome ${name}!</h2>
        <p>Dear User,</p>
        <p>Thank you for registering with us. To complete your registration and verify your identity, please use the following OTP:</p>
        <h3 style="color: #4CAF50;">${generatedOtp}</h3>
        <p>This OTP is valid for 5 minutes. If you did not request this OTP, please ignore this email.</p>
        <p>Best Regards,<br>The INOX PARADISE Team</p>
      </body>
    </html>
  `;

    const mailResponse = await mailSender(email, title, emailBody);
    if (!mailResponse) {
      throw new Error("Failed to send OTP!");
    }

    return res
      .status(200)
      .json({ message: "OTP sent successfully", otpId: newOtp._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

async function verifyOtp(req, res) {
  const { email, password, otpId, otp, name } = req.body;

  try {
    if (!email || !password || !otpId || !otp || !name) {
      throw new Error("All fields are required");
    }
    const existingOtp = await OtpModel.findById(otpId);
    if (!existingOtp) {
      throw new Error("OTP expired, send again!");
    }
    if (existingOtp.otp !== otp) {
      throw new Error("Wrong otp");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedpassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
      name: name,
      email,
      password: hashedpassword
    });

    await newUser.save();
    await existingOtp.deleteOne();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function loginWithEmailPass(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Wrong password");
    }

    existingUser.password = "";

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
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

    return res.status(200).json({ user: existingUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

async function getUser(req, res) {
  const { role } = req;
  if (role !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await UserModel.findById(req.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
}

async function bookTicket(req, res) {
  try {
    // Extract user role and ID from request
    const { role, id } = req;

    // Check for unauthorized access
    if (role !== "user") {
      throw new Error("Unauthorized");
    }

    // Get ticket data from request body
    const { ticketData } = req.body;

    // Find user and check if exists
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    // Find schedule and check if exists
    const schedule = await ScheduleModel.findById(ticketData.scheduleid);
    if (!schedule) {
      throw new Error("Show not found");
    }

    // Generate booking ID and assign it to ticket data
    const bookingId = generateRandomString();
    ticketData.bookingId = bookingId;

    // Create a new ticket instance
    const newTicket = new TicketModel(ticketData);
    newTicket.user = user._id;
    newTicket.price = ticketData.withGstPrice;

    // Add the new ticket ID to user's tickets
    user.myTickets.push(newTicket._id);

    // Prepare the booked seats
    const seats = ticketData.seats.map(seat => seat.id);

    // Update schedule with booked seats and revenue
    schedule.bookedSeats.push(seats);
    schedule.availableSeats -= seats.length;
    schedule.bookedCount += 1;
    schedule.revenue += ticketData.price * ticketData.seats.length;

    // Save changes to the database
    await Promise.all([schedule.save(), user.save(), newTicket.save()]);

    // Send booking success email (commented out)
    // await BookingSuccessEmailSend(user, ticketData, ticketData.movie.poster);

    // Return success response
    return res.status(200).json({ message: "Ticket booked successfully" });
  } catch (error) {
    // Log the error and send a response with the error message
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
}

export { sendOtp, verifyOtp, loginWithEmailPass, getUser, logout, bookTicket };
