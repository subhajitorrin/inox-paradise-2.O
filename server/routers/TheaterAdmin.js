import express from "express";
import AuthToken from "../middleware/AuthToken.js"
import {
  loginTheaterAdminWithOtp,
  logout,
  verifyOtpForTheaterAdmin,
  getTheaterAdmin
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
TheaterRouter.get("/theateradmin/get-admin",AuthToken,getTheaterAdmin)
TheaterRouter.post("/logout", logout);
export default TheaterRouter;
