import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  addTheaterAdmin,
  loginMasterAdmin
} from "../controllers/MasterAdminControllers.js";
const MasterAdminRotuer = express.Router();
MasterAdminRotuer.post("/masteradmin/login", loginMasterAdmin);
MasterAdminRotuer.post(
  "/masteradmin/add-theater-admin",
  AuthToken,
  addTheaterAdmin
);
export default MasterAdminRotuer;
