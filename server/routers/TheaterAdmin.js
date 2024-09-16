import express from "express";
import {
  loginTheaterAdmin,
  loginTheaterAdminWithOtp,
  verifyOtpForTheaterAdmin
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/login", loginTheaterAdmin);
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
export default TheaterRouter;
