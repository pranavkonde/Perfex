const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const myGoalModel = require("../database/models/acceptedGoal");

const myGoalRouter = express.Router();

const app = express();
app.use(express.json());

// Route to create Goal
// myGoalRouter.post("/acceptGoal/:goalId", async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//     const employeeId = decodedToken.employeeId;

//     const {
//       status,
//       description,
//       sDate,
//       eDate,
//       rating,
//       priority,
//       title,
//       weightage,
//     } = req.body;

//     const newGoal = await goalModel.create({
//       employeeId,
//       status,
//       description,
//       sDate,
//       eDate,
//       rating,
//       priority,
//       title,
//       weightage,
//     });

//     res.status(201).json(newGoal);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating goal", error: error.toString() });
//   }
// });

// Route to create goal by HR
myGoalRouter.post("/acceptGoal/:goalId", async (req, res) => {
  try {
    const data = req.body;
    const newGoal = await myGoalModel.create(data);
    if (!newGoal?._id) {
      return res.status(401).end();
    }
    res.status(200).json(newGoal);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating goal by HR", error: error.toString() });
  }
});

// Route to get all Goals
myGoalRouter.get("/getAllGoal/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await myGoalModel.find({ userId: userId });
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving all goals", error: error.toString() });
  }
});

// // Route to get Goal using goal Id
// myGoalRouter.get("/:goalId", async (req, res) => {
//   try {
//     const { goalId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(goalId)) {
//       return res.status(400).json({ message: "Invalid goalId format" });
//     }

//     const goal = await goalModel.findById(goalId);
//     if (!goal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }

//     res.status(200).json(goal);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving goal", error: error.toString() });
//   }
// });

// // Route to get Goal using employee Id
// myGoalRouter.get("/emp/:employeeId", async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const goals = await goalModel.find({ employeeId: employeeId });
//     res.status(200).json(goals);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error retrieving goals", error: error.toString() });
//   }
// });

// // Route to update Goal using goalId
// myGoalRouter.put("/:goalId", async (req, res) => {
//   const token = req.cookies.token;
//   const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//   const employeeId = decodedToken.employeeId;

//   try {
//     const { goalId } = req.params;
//     const {
//       status,
//       description,
//       sDate,
//       eDate,
//       rating,
//       priority,
//       title,
//       weightage,
//     } = req.body;

//     const updatedGoal = await goalModel.findByIdAndUpdate(goalId, {
//       employeeId,
//       status,
//       description,
//       sDate,
//       eDate,
//       rating,
//       priority,
//       title,
//       weightage,
//     });

//     if (!updatedGoal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }
//     res.status(200).json({ message: "Goal Updated" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating goal", error: error.toString() });
//   }
// });

// // Route to delete Goal using goalId
// myGoalRouter.delete("/:goalId", async (req, res) => {
//   try {
//     const { goalId } = req.params;
//     const deletedGoal = await goalModel.findByIdAndDelete(goalId);

//     if (!deletedGoal) {
//       return res.status(404).json({ message: "Goal not found" });
//     }
//     res.status(200).json({ message: "Goal deleted successfully", deletedGoal });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting goal", error: error.toString() });
//   }
// });

module.exports = myGoalRouter;