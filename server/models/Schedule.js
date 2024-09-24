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
      default: function () {
        return new Date(this.endTime.getTime() + 15 * 60 * 1000);
      }
    },
    bookedSeats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        default: []
      }
    ],
    bookedCount: {
      type: Number,
      default: 0
    },
    totalSeats: {
      type: Number,
      required: true,
      default: 0
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
      enum: ["Now Showing", "Upcoming", "Finished Showing"],
      default: "Upcoming"
    },
    discounts: [
      {
        type: String,
        default: []
      }
    ],
    screenType: {
      type: String,
      enum: ["2D", "3D", "IMAX", "4DX"],
      required: true
    }
  },
  { timestamps: true }
);

const ScheduleModel = mongoose.model("Schedule", scheduleSchema);

export default ScheduleModel;
