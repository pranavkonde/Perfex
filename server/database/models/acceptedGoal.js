const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    goalId: {
      type: String,
      required: true,
    },
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

const Goal = mongoose.model("myGoal", goalSchema);

module.exports = Goal;
