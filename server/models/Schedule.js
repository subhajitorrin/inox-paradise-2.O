import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema(
  {
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen",
      required: true
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    nextShowTime: {
      type: Date,
      default: null
    },
    bookedSeats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        default: []
      }
    ],
    totalSeats: {
      type: Number,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true,
      default: function () {
        return this.totalSeats;
      }
    },
    language: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "canceled"],
      default: "active"
    },
    discounts: [
      {
        type: String,
        default: []
      }
    ]
  },
  { timestamps: true }
);

const ScheduleModel = mongoose.model("Schedule", scheduleSchema);

export default ScheduleModel;
