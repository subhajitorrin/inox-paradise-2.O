import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  addTheaterAdmin,
  getAllTheaters,
  getMasterAdmin,
  loginMasterAdmin,
  sendOTPforTheaterRegistration,
  deleteTheater,
  addMovie,
  updateMovie
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
MasterAdminRotuer.get(
  "/masteradmin/get-all-theaters",
  AuthToken,
  getAllTheaters
);
MasterAdminRotuer.delete(
  "/masteradmin/delete-theater/:id",
  AuthToken,
  deleteTheater
);
MasterAdminRotuer.post("/masteradmin/add-movie", AuthToken, addMovie);
MasterAdminRotuer.put("/masteradmin/update-movie", AuthToken, updateMovie);
export default MasterAdminRotuer;
