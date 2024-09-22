import mongoose from "mongoose";

const seatCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen"
  },
  gaps: [Number],
  rows: {
    type: Number,
    default: 0
  },
  seatsPerRow: {
    type: Number,
    default: 0
  },
  layout: [
    {
      row: {
        type: String
      },
      seats: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seat"
        }
      ]
    }
  ]
});

const SeatCategoryModel = mongoose.model("SeatCategory", seatCategorySchema);
export default SeatCategoryModel;
