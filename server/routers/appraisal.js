const express = require('express');
const AppraisalDecisionModal = require('../database/models/appraisal');
const jwt = require('jsonwebtoken');

const AppraisalDecisionRouter = express.Router();

const app = express();
app.use(express.json());


// Route to create a new appraisal decision
AppraisalDecisionRouter.post('/createAppraisalDecision', async (req, res) => {
    try {

        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const employeeId = decodedToken.employeeId;

        const appraisalDecisionData = {
            employeeId: employeeId,
            reviewId: req.body.reviewId,
            managerName: req.body.managerName,
            decision: req.body.decision
        };

        const savedAppraisalDecision = await AppraisalDecisionModal.create(appraisalDecisionData);
        res.status(201).json(savedAppraisalDecision);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appraisal decision', error: error.toString() });
    }
});

// Route to get all appraisal decisions
AppraisalDecisionRouter.get('/GetAllAppraisalDecisions', async (req, res) => {
    try {
        const appraisalDecisions = await AppraisalDecisionModal.find({});
        res.status(200).json(appraisalDecisions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appraisal decisions', error: error.toString() });
    }
});

// Route to get an appraisal decision by its ID
AppraisalDecisionRouter.get('/GetByIdAppraisalDecision/:appraisalDecisionId', async (req, res) => {
    try {
        const appraisalDecision = await AppraisalDecisionModal.findById(req.params.appraisalDecisionId);
        if (!appraisalDecision) {
            return res.status(404).json({ message: 'Appraisal decision not found' });
        }
        res.status(200).json(appraisalDecision);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving appraisal decision', error: error.toString() });
    }
});

// Route to update an appraisal decision by its ID
AppraisalDecisionRouter.put('/UpdateByAppraisalDecision/:appraisalDecisionId', async (req, res) => {
    try {
        const updatedAppraisalDecision = await AppraisalDecisionModal.findByIdAndUpdate(req.params.appraisalDecisionId, req.body, { new: true });
        if (!updatedAppraisalDecision) {
            return res.status(404).json({ message: 'Appraisal decision not found' });
        }
        res.status(200).json(updatedAppraisalDecision);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appraisal decision', error: error.toString() });
    }
});

// Route to delete an appraisal decision by its ID
AppraisalDecisionRouter.delete('/DeleteByAppraisalDecision/:appraisalDecisionId', async (req, res) => {
    try {
        const deletedAppraisalDecision = await AppraisalDecisionModal.findByIdAndDelete(req.params.appraisalDecisionId);
        if (!deletedAppraisalDecision) {
            return res.status(404).json({ message: 'Appraisal decision not found' });
        }
        res.status(200).json({ message: 'Appraisal decision deleted successfully', deletedAppraisalDecision });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appraisal decision', error: error.toString() });
    }
});

module.exports= AppraisalDecisionRouter;