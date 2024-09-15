import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true
  },
  screenNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat"
    }
  ],
  capacity: {
    type: Number,
    required: true
  },
  screenType: {
    type: String,
    enum: ["2D", "3D", "IMAX", "4DX"],
    required: true
  }
});

const ScreenModel = mongoose.model("Screen", ScreenSchema);
export default ScreenModel;
