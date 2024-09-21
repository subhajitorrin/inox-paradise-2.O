import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
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
