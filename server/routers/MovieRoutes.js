import express from "express";
import AuthToken from "../middleware/AuthToken.js";
import {
  getAllMovies,
  getNewReleaseMovies,
  getUpcomingMovies,
  getMovieById,
  getSchedulesByMovieId,
  searchMovie,
  getSeatMatrix
} from "../controllers/MovieControllers.js";
const MovieRouter = express.Router();
MovieRouter.get("/get-all-movies", getAllMovies);
MovieRouter.get("/movie-by-id/:id", getMovieById);
MovieRouter.get("/get-upcoming-movies", getUpcomingMovies);
MovieRouter.get("/get-newrelease-movies", getNewReleaseMovies);
MovieRouter.get(
  "/get-schedules-by-movie/:movieid/:date/:language/:screen",
  getSchedulesByMovieId
);
MovieRouter.get("/search", searchMovie);
MovieRouter.get("/seatmatrix/:scheduleid", getSeatMatrix);
MovieRouter.get("/seatmatrix/:scheduleid", getSeatMatrix);
export default MovieRouter;
