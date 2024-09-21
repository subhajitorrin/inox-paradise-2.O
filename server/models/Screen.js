import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true
  },
  screenName: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: 0
  },
  screenType: {
    type: String,
    enum: ["2D", "3D", "IMAX", "4DX"],
    required: true
  },
  schedules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule"
    }
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SeatCategory"
    }
  ]
});

const ScreenModel = mongoose.model("Screen", ScreenSchema);
export default ScreenModel;
