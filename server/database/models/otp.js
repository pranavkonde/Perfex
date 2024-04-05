const mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  otp: {
      type: String,
      required: true,
  },
  expireAt: {
    type: Date,
    required: true
  }
},
{ timestamps: true }
);

const otpModel = mongoose.model('otp', otpSchema);

module.exports = otpModel;