import mongoose from "mongoose";
const MasterAdminSchema = new mongoose.Schema({
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
  theaters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater"
    }
  ],
  role: {
    type: String,
    default: "masteradmin"
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

const MasterAdmin = mongoose.model("MasterAdmin", MasterAdminSchema);
export default MasterAdmin;
