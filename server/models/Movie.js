import mongoose from "mongoose";

const castSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    CBFCrating: { type: String, required: true },
    language: { type: [String], required: true },
    poster: { type: String, required: true },
    trailerUrl: String,
    rating: Number,
    cast: [castSchema],
    synopsis: { type: String, required: true },
    categories: { type: String, required: true },
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: [] }
    ]
  },
  {
    timestamps: true
  }
);

const MovieModel = mongoose.model("currentmovies", movieSchema);

export default MovieModel;
