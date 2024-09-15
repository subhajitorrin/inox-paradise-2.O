import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import { getAllMovies } from "../controllers/MovieControllers.js";
const MovieRouter = express.Router();
MovieRouter.get("/get-all-movies", AuthToken, getAllMovies);
export default MovieRouter;
