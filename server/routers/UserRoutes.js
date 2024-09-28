import express from "express";
import {sendOtp} from "../controllers/UserControllers.js";
const UserRouter = express.Router();
UserRouter.post("/user/send-otp", sendOtp);
export default UserRouter;
