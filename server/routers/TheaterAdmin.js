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
  deleteScreen,
  updateCategory,
  deleteCategory,
  getAvailableScreens,
  addSchedule,
  getFilteredSchedules,
  addFood,
  getFoods,
  updateFood
} from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/send-otp", loginTheaterAdminWithOtp);
TheaterRouter.post("/theateradmin/verify-otp", verifyOtpForTheaterAdmin);
TheaterRouter.get("/theateradmin/get-admin", AuthToken, getTheaterAdmin);
TheaterRouter.post("/logout", logout);
TheaterRouter.post(`/theateradmin/screen/add-screen`, AuthToken, addScreen);
TheaterRouter.get(`/theateradmin/screen/get-screens`, AuthToken, getScreens);
TheaterRouter.post(
  `/theateradmin/screen/add-category/:screenid`,
  AuthToken,
  addCategory
);
TheaterRouter.put(
  `/theateradmin/screen/update-screen/:screenid`,
  AuthToken,
  updateScreen
);
TheaterRouter.delete(
  `/theateradmin/screen/delete-screen/:screenid`,
  AuthToken,
  deleteScreen
);
TheaterRouter.delete(
  `/theateradmin/screen/delete-category/:categoryid`,
  AuthToken,
  deleteCategory
);
TheaterRouter.put(
  `/theateradmin/screen/update-category/:categoryid`,
  AuthToken,
  updateCategory
);
TheaterRouter.post(
  `/theateradmin/screen/get-available-screens`,
  AuthToken,
  getAvailableScreens
);
TheaterRouter.post(
  `/theateradmin/schedule/add-schedule`,
  AuthToken,
  addSchedule
);
TheaterRouter.post(
  `/theateradmin/schedule/get-schedules`,
  AuthToken,
  getFilteredSchedules
);

// food routes
TheaterRouter.post(`/theateradmin/food/add-food`, AuthToken, addFood);
TheaterRouter.get(`/theateradmin/food/get-foods`, AuthToken, getFoods);
TheaterRouter.put(`/theateradmin/food/update-food/:foodid`, AuthToken, updateFood);

export default TheaterRouter;
