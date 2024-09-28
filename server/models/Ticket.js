import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  language: String,
  date: String,
  time: String,
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
  seatCount: Number,
  seatCategory: String,
  seats: [
    {
      name: String,
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Seat" },
      _id: false
    }
  ],
  bookingId: String,
  price: Number,
  screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen" },
  foods: [String],
  bookedAt: { type: Date, default: Date.now }
});

const ticketModel = mongoose.model("tickets", ticketSchema);

export default ticketModel;
