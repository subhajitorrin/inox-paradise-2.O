import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  row: {
    type: String,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatCategory",
    required: true
  },
  screen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screen",
    required: true
  }
});

const SeatModel = mongoose.model("Seat", seatSchema);
export default SeatModel;
