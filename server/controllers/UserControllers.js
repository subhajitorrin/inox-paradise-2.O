import generateOtp from "../utils/generateOtp.js";
import mailSender from "../utils/SendMail.js";
import OtpModel from "../models/OTP.js";

async function sendOtp(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
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
        <h2>Welcome to INOX PARADISE!</h2>
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

export { sendOtp };
