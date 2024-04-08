const mongoose = require('mongoose');
const { Schema } = mongoose;

const appraisalDecisionSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    decision: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AppraisalDecision = mongoose.model('AppraisalDecision', appraisalDecisionSchema);

module.exports = AppraisalDecision;
