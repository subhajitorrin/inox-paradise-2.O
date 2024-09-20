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

export { getAllMovies };
