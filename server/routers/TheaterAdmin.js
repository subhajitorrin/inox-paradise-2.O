import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  loginTheaterAdminWithOtp,
  logout,
  verifyOtpForTheaterAdmin,
  getTheaterAdmin,
  addScreen
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
TheaterRouter.get("/theateradmin/get-admin", AuthToken, getTheaterAdmin);
TheaterRouter.post("/logout", logout);
TheaterRouter.post(`/theateradmin/screen/add-screen`, AuthToken, addScreen);
export default TheaterRouter;
