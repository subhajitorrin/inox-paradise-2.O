import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  language: String,
  date: String,
  time: String,
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "TheaterAdmin" },
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
  bookedAt: { type: Date, default: Date.now },
  isCancelled: { type: Boolean, default: false },
  isUpcoming: { type: Boolean, default: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }
});

const ticketModel = mongoose.model("Ticket", ticketSchema);

export default ticketModel;
