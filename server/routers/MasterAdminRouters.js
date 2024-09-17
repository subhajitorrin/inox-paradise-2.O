import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  addTheaterAdmin,
  getMasterAdmin,
  loginMasterAdmin,
  sendOTPforTheaterRegistration
} from "../controllers/MasterAdminControllers.js";
const MasterAdminRotuer = express.Router();
MasterAdminRotuer.post("/masteradmin/login", loginMasterAdmin);
MasterAdminRotuer.post(
  "/masteradmin/add-theater-admin",
  AuthToken,
  addTheaterAdmin
);
MasterAdminRotuer.post(
  "/masteradmin/get-master-admin",
  AuthToken,
  getMasterAdmin
);
MasterAdminRotuer.post(
  "/masteradmin/send-otp-for-theater-registration",
  AuthToken,
  sendOTPforTheaterRegistration
);
export default MasterAdminRotuer;
