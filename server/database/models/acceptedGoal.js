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
    startDate: {
      type: String,
      required: false,
    },
    endDate: {
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
    projectName: {
      type: String,
      required: false,
    },
    weightage: {
      type: String,
      require: false,
    },
    employeeComment:{
        type:String,
        require: false
      },
      managerName:{
        type: String,
        require: false
      },
      managerRating:{
        type: String,
        require: false
      },
      managerComment:{
        type: String,
        require: false
      },
      isApproved:{
        type: String,
        require: false,
        default: "NA"
      }
    },
  { timestamps: true }
);

const Goal = mongoose.model("myGoal", goalSchema);

module.exports = Goal;
