import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String
    }
  },
  { timestamps: true }
);
const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
