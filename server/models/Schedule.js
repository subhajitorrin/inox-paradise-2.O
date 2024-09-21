import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  title: String
});

const ScheduleModel = mongoose.model("Schedule", ScheduleSchema);
export default ScheduleModel;
