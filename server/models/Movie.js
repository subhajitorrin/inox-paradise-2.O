import mongoose from "mongoose";
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
    rating: { type: Number, default: 0.0 },
    screenType: [
      {
        type: String,
        enum: ["2D", "3D", "IMAX", "4DX"],
        default: ["2D"]
      }
    ],
    castList: [
      {
        type: {
          name: { type: String, required: true },
          profile: { type: String, required: true }
        },
        default: []
      }
    ],
    synopsis: { type: String, required: true },
    popularity: { type: Number, default: 0 },
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: [] }
    ]
  },
  {
    timestamps: true
  }
);

const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;
