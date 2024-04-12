const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
 full_name: {
    type: String,
    required: true,
 },
 email: {
    type: String,
    required: true,
    unique: true,
 },
 phone_no: {
    type: String,
    required: true,
 },
 department: {
    type: String,
    required: true,
 },
 gender:{
   type: String,
   required:false
 },
 role: {
    type: String,
    required: true,
 },
 password: {
    type: String,
    required: true,
 },
 dateOfJoining: {
    type: Date,
    required: false,
 },
 appraisalDate: {
    type: Date,
    required: false,
 },
 appraisalRating: {
    type: Number,
    required: false,
 },
 address: {
    type: String,
    required: false,
 },
 managerName: {
    type: String,
    required: false,
 },
 hrName: {
    type: String,
    required: false,
 },
 empId:{
    type: String,
    required: true,
 },
 employeeType:{
    type:String,
    required:true
 },
 isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
},
 { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
