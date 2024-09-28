import express from "express";
import {sendOtp, verifyOtp} from "../controllers/UserControllers.js";
const UserRouter = express.Router();
UserRouter.post("/user/send-otp", sendOtp);
UserRouter.post("/user/verify-otp", verifyOtp);
export default UserRouter;
