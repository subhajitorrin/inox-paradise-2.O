import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import { getAllMovies,getNewReleaseMovies,getUpcomingMovies,getMovieById } from "../controllers/MovieControllers.js";
const MovieRouter = express.Router();
MovieRouter.get("/get-all-movies", getAllMovies);
MovieRouter.get("/movie-by-id/:id", getMovieById);
MovieRouter.get("/get-upcoming-movies", getUpcomingMovies);
MovieRouter.get("/get-newrelease-movies", getNewReleaseMovies);
export default MovieRouter;
