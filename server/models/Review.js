import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    rating: {
      type: String,
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
