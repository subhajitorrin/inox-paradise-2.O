import express from "express";
import { loginMasterAdmin } from "../controllers/MasterAdminControllers.js";
const MasterAdminRotuer = express.Router();
MasterAdminRotuer.post("/masteradmin-login",loginMasterAdmin)
export default MasterAdminRotuer