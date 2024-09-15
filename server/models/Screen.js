import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat"
    }
  ]
});

const ScreenModel = mongoose.model("Screen", ScreenSchema);
export default ScreenModel;
