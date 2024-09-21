import mongoose from "mongoose";

const seatCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen"
  },
  layout: [
    {
      row: {
        type: String,
        required: true
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
