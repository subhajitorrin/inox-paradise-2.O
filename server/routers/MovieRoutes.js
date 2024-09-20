import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import { getAllMovies,getUpcomingMovies } from "../controllers/MovieControllers.js";
const MovieRouter = express.Router();
MovieRouter.get("/get-all-movies", getAllMovies);
MovieRouter.get("/get-upcoming-movies", getUpcomingMovies);
export default MovieRouter;
