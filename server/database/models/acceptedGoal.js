const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    employeeType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    sDate: {
      type: String,
      required: false,
    },
    eDate: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    weightage: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
