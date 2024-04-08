const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "employee",
        required: true,
      },
    status: {
        type: String,
        required: true,
     },
     description : {
        type: String,
        required: true,
     },
     sDate: {
        type: String,
        required: true,
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
     title:{
        type:String,
        required:true,
     },
     weightage:{
      type:String,
      require: false
     }
    },
    { timestamps: true });
   
   const Goal = mongoose.model('Goal', goalSchema);
   
   module.exports = Goal;