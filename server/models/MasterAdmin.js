import mongoose from "mongoose";
const MasterAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  theaters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater"
  }
});

const MasterAdmin = mongoose.model("MasterAdmin", MasterAdminSchema);
export default MasterAdmin;
