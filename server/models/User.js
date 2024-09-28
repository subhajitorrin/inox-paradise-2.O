import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  myTickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: []
    }
  ],
  wallet: {
    type: Number,
    default: 0
  }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
