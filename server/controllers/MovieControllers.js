import MovieModel from "../models/Movie.js";

async function getAllMovies(req, res) {
  try {
    const movies = await MovieModel.find({});
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching movies" });
  }
}

async function getUpcomingMovies(req, res) {
  try {
    const today = new Date();
    const movies = await MovieModel.find({ releaseDate: { $gt: today } });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching upcoming movies" });
  }
}

async function getNewReleaseMovies(req, res) {
  try {
    const today = new Date();
    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(today.getMonth() - 3);
    const movies = await MovieModel.find({
      releaseDate: { $gte: threeMonthAgo, $lte: today }
    }).sort({ releaseDate: -1 });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching upcoming movies" });
  }
}

async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching movie" });
  }
}
export { getAllMovies, getUpcomingMovies, getNewReleaseMovies, getMovieById };
