const express = require('express');
const mongoose = require('mongoose');
const reviewModel = require('../database/models/review'); 
const goalModel = require('../database/models/goal'); 
const employeeModel = require("../database/models/employee");


const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const reviewRouter = express.Router();

// Route to create a new review
reviewRouter.post('/createReview', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const employeeId = decodedToken.employeeId;

        const goalId = req.body.goalId;

        const goal = await goalModel.findById(goalId, 'description title -_id');
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        const savedReview = await reviewModel.create({
            ...req.body,
            employeeId,
            goalDescription: goal.description,
            goalTitle: goal.title
        });

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error: error.toString() });
    }
});


// Route to get all reviews
reviewRouter.get('/getAllReview', async (req, res) => {
    try {
        const reviews = await reviewModel.find({});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});


// Route to get a review by its ID
reviewRouter.get('/getReview/:reviewId', async (req, res) => {
    try {
        const review = await reviewModel.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving review', error: error.toString() });
    }
});


// Route to update a review by its ID
reviewRouter.put('/updateReview/:reviewId', async (req, res) => {
    try {
        const updatedReview = await reviewModel.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error: error.toString() });
    }
});


// Route to delete a review by its ID
reviewRouter.delete('/reviewDelete/:reviewId', async (req, res) => {
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(req.params.reviewId.trim());
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully', deletedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.toString() });
    }
});


// Route to get Reviews by Employee ID
reviewRouter.get('/employee/:employeeId', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.employeeId.trim())) {
            return res.status(400).json({ message: 'Invalid employeeId format' });
        }        
        const reviews = await reviewModel.find({ employeeId: req.params.employeeId.trim() });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});

// Route to get Reviews by Goal ID
reviewRouter.get('/goal/:goalId', async (req, res) => {
    try {
        const reviews = await reviewModel.find({ goalId: req.params.goalId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});


// Route to get Reviews by Manager Name
reviewRouter.get('/getReviewByManager/:managerName', async (req, res) => {
    try {
        const reviews = await reviewModel.find({ managerName: req.params.managerName });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});

//Route to get Reviews by Date Range
reviewRouter.get('/date-range', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const reviews = await reviewModel.find({
            reviewDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});


// Route to get Reviews by Rating
reviewRouter.get('/getReviewByrating/:rating', async (req, res) => {
    try {
        const reviews = await reviewModel.find({ managerRating: req.params.rating });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});


//Route to get Reviews by Goal Title
reviewRouter.get('/getReviewByGoal/:goalTitle', async (req, res) => {
    try {
        const reviews = await reviewModel.find({ goalTitle: req.params.goalTitle });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reviews', error: error.toString() });
    }
});


// Route for Manager Notifications
reviewRouter.get('/notification', async (req, res)=>{
    try{
        const { userId, goalId } = req.body;
        const goal = await goalModel.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        const employee = await employeeModel.findById(userId);
        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }

        const combinedDetails = {
            goal: goal,
            employee: employee
        };

        res.json(combinedDetails);

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving details', error: error.toString() });
    }
})

// Route to Post manager Rating and comment
reviewRouter.post('/updateEmployee', async (req, res) => {
    try {
        const { userId, mg_rating, mg_comment, isVerified } = req.body;
        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            userId,
            {
                mg_rating: mg_rating,
                mg_comment: mg_comment,
                isVerified: isVerified
            },
            { new: true } 
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.toString() });
    }
});


module.exports = reviewRouter;





