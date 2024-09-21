import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["Regular", "Premium", "VIP"],
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
