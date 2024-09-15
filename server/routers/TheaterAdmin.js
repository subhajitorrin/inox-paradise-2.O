import express from "express";
import { loginTheaterAdmin } from "../controllers/TheaterAdminController.js";
const TheaterRouter = express.Router();
TheaterRouter.post("/theateradmin/login", loginTheaterAdmin);
export default TheaterRouter;
