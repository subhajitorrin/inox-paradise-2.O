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
    
  ]
});

const TheaterAdminModel = mongoose.model("TheaterAdmin", TheaterAdminSchema);
export default TheaterAdminModel;
