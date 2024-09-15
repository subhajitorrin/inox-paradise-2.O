import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import MasterAdminRotuer from "./routers/MasterAdminRouters.js";
import MovieRouter from "./routers/MovieRoutes.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/masteradmin", MasterAdminRotuer);
app.use("/", MovieRouter);

mongoose
  .connect(MONGOURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database Connected");
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting mongodb", error);
  });
