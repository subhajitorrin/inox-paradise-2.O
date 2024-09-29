import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater"
  }
});

const FoodModel = mongoose.model("Food", FoodSchema);
export default FoodModel;
