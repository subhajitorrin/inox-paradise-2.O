import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  sendOtp,
  verifyOtp,
  loginWithEmailPass,
  getUser,
  logout,
  bookTicket
} from "../controllers/UserControllers.js";
const UserRouter = express.Router();
UserRouter.post("/user/send-otp", sendOtp);
UserRouter.post("/user/verify-otp", verifyOtp);
UserRouter.post("/user/login", loginWithEmailPass);
UserRouter.get("/user/get-user", AuthToken, getUser);
UserRouter.post("/user/logout", logout);
UserRouter.post("/user/book-ticket", AuthToken, bookTicket);
export default UserRouter;