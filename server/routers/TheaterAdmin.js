import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  loginTheaterAdminWithOtp,
  logout,
  verifyOtpForTheaterAdmin,
  getTheaterAdmin,
  addScreen,
  getScreens,
  addCategory,
  updateScreen,
  deleteScreen
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
TheaterRouter.get("/theateradmin/get-admin", AuthToken, getTheaterAdmin);
TheaterRouter.post("/logout", logout);
TheaterRouter.post(`/theateradmin/screen/add-screen`, AuthToken, addScreen);
TheaterRouter.get(`/theateradmin/screen/get-screens`, AuthToken, getScreens);
TheaterRouter.post(`/theateradmin/screen/add-category/:screenid`, AuthToken, addCategory);
TheaterRouter.put(`/theateradmin/screen/update-screen/:screenid`, AuthToken, updateScreen);
TheaterRouter.delete(`/theateradmin/screen/delete-screen/:screenid`, AuthToken, deleteScreen);
export default TheaterRouter;
