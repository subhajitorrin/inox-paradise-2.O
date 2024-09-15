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
  }
});

const FoodModel = mongoose.model("Food", FoodSchema);
export default FoodModel;
