const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    goalId: {
        type: Schema.Types.ObjectId,
        ref: 'Goal', 
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    reviewDate: {
        type: String,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    managerRating: {
        type: Number,
        required: true
    },
    goalDescription: {
        type: String,
        required: true
    },
    goalTitle: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
