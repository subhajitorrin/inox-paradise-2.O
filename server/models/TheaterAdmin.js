import mongoose from "mongoose";

const TheaterAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "theateradmin"
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }
  ],
  screens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Screen"
    }
  ]
});

const TheaterAdminModel = mongoose.model("TheaterAdmin", TheaterAdminSchema);
export default TheaterAdminModel;
