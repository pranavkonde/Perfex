const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    employeeId:{
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: false
    },
    employeeType: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
