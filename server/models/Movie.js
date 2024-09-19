import mongoose from "mongoose";

const castSchema = new mongoose.Schema(
  {
    name: String,
    image: String
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
  duration: Number,
  language: [String],
  CBFCratnig: String,
  releaseDate: String,
  cast: [castSchema],
  synopsis: String,
  rating: String,
  poster: String,
  trailerUrl: String,
  categories: String,
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: [] }
  ]
});

const MovieModel = mongoose.model("currentmovies", movieSchema);

export default MovieModel;
