import express from "express";
import {
  loginTheaterAdmin,
  loginTheaterAdminWithOtp,
  logout,
  verifyOtpForTheaterAdmin
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
TheaterRouter.post("/logout", logout);
export default TheaterRouter;
