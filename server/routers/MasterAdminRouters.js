import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  addTheaterAdmin,
  getMasterAdmin,
  loginMasterAdmin
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
export default MasterAdminRotuer;
