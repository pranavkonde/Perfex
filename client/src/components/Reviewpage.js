import React, { useState, useEffect } from "react";
import Navbar1 from "./Navbar1";
import "./ReviewPage.css";
import Profilesection from "./Profilesection";
import axios from "axios";

const GoalTracker = () => {
  const initialGoals = [
    {
      id: 1,
      title: "Team Work",
      description: "...........",
      rating: 1,
      status: "To Do",
      priority: "Low",
      dueDate: "",
      weightage: 10,
    },
    {
      id: 2,
      title: "Leadership",
      description: "................",
      rating: 1,
      status: "To Do",
      priority: "Low",
      dueDate: "",
      weightage: 20,
    },
    {
      id: 3,
      title: "Communication",
      description: "..........",
      rating: 1,
      status: "To Do",
      priority: "Low",
      dueDate: "",
      weightage: 10,
    },

    {
      id: 4,
      title: "Conceptual Thinking",
      description: "..........",
      rating: 1,
      status: "To Do",
      priority: "Low",
      dueDate: "",
      weightage: 20,
    },

    {
      id: 5,
      title: "Analytical Skills",
      description: "..........",
      rating: 1,
      status: "To Do",
      priority: "Low",
      dueDate: "",
      weightage: 40,
    },
  ];

  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(initialGoals[0]);
  const [overallRating, setOverallRating] = useState(0);
  const [hasIncompleteGoals, setHasIncompleteGoals] = useState(false);
  const [showOverallRating, setShowOverallRating] = useState(false);
  const [profile, setProfile] = useState({});
  const [employeeId, setEmployeeId] = useState("");

  function calculateWeightedAverage(goals) {
    let weightedSum = 0;
    let totalWeightage = 0;

    goals.forEach((goal) => {
      if (goal.status === "Completed") {
        weightedSum += goal.rating * goal.weightage;
        totalWeightage += goal.weightage;
      }
    });

    let weightedAverage = 0;
    if (totalWeightage > 0) {
      weightedAverage = weightedSum / totalWeightage;
    }

    return weightedAverage;
  }

  useEffect(() => {
    const overallRating = calculateWeightedAverage(goals);
    setOverallRating(overallRating);
  }, [goals]);

  const handleManagerRatingChange = (event) => {
    const newManagerRating = parseInt(event.target.value);
    const updatedGoal = { ...selectedGoal, managerRating: newManagerRating };
    updateGoal(updatedGoal);
  };

  const handleManagerCommentChange = (event) => {
    const newManagerComment = event.target.value;
    const updatedGoal = { ...selectedGoal, managerComment: newManagerComment };
    updateGoal(updatedGoal);
  };

  const handleEmployeeCommentChange = (event) => {
    // Assuming you want to update the selected goal's managerComment property
    const updatedComment = event.target.value;
    const updatedGoal = { ...selectedGoal, employeeComment: updatedComment };
    updateGoal(updatedGoal);
  };

  const handleSave = () => {
    console.log("Goals saved:", goals);
    console.log("Overall Rating:", overallRating.toFixed(2));
    setShowOverallRating(true);
  };

  const handleGoalSelect = (goalId) => {
    const goal = goals.find((goal) => goal.id === goalId);
    setSelectedGoal(goal);
  };

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    const updatedGoal = { ...selectedGoal, rating: newRating };
    updateGoal(updatedGoal);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const updatedGoal = { ...selectedGoal, status: newStatus };
    updateGoal(updatedGoal);
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    const updatedGoal = { ...selectedGoal, priority: newPriority };
    updateGoal(updatedGoal);
  };

  const handleDueDateChange = (event) => {
    const newDueDate = event.target.value;
    const updatedGoal = { ...selectedGoal, dueDate: newDueDate };
    updateGoal(updatedGoal);
  };

  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoal);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await axios.get(
          "http://localhost:5500/employee/authenticate",
          { withCredentials: true }
        );
        if (!token?.data) throw new Error("Network response was not ok");
        setEmployeeId(token?.data?.employeeId);

        const response = await axios.get(
          `http://localhost:5500/employee/${token?.data?.employeeId}`
        );
        if (!response?.data) throw new Error("Network response was not ok");

        const data = response?.data;
        console.log(data);

        setProfile(response.data);

        const goalsResponse = await axios.get(
          `http://localhost:5500/goal/emp/${token?.data?.employeeId}`
        );
        if (!goalsResponse?.data)
          throw new Error("Network response was not ok");
        setGoals(goalsResponse.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div>
      <Navbar1 currentPage="Trackgoal" />
      <div className="profile-goaldetails">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Profilesection profile={profile} />
          <div className="goal-tracker">
            <div className="goal-container">
              <div className="goal-list">
                <h2>Goals:</h2>
                <ul>
                  {goals.map((goal) => (
                    <li key={goal.id} onClick={() => handleGoalSelect(goal.id)}>
                      {goal.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="goal-detailss">
          {selectedGoal && (
            <>
              <h2>{selectedGoal.title}</h2>
              <p>
                <strong>Description:</strong> {selectedGoal.description}
              </p>
              <div className="employee-comment">
                <p>
                  <strong>Employee Comment:</strong>{" "}
                  {selectedGoal.employeeComment || "No comment"}
                </p>
              </div>
              <div className="dropdown-container">
                <p>
                  <strong>Rating:</strong> {selectedGoal.rating}
                </p>
                <p>
                  <strong>Status:</strong> {selectedGoal.status}
                </p>
                <p>
                  <strong>Priority:</strong> {selectedGoal.priority}
                </p>
                <p>
                  <strong>Due Date:</strong> {selectedGoal.dueDate}
                </p>
                <p>
                  <strong>Weightage:</strong> {selectedGoal.weightage}%
                </p>
                <div className="manager-feedback">
                  <p>
                    <strong>Manager Rating:</strong>{" "}
                    {selectedGoal.managerRating || "No rating"}
                  </p>
                  <div className="manager-comment">
                    <p>
                      <strong>Manager Comment:</strong>{" "}
                      {selectedGoal.managerComment || "No comment"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="overall-rating">
        {showOverallRating && (
          <>
            <h2>
              Overall Rating:{" "}
              <span className="rating-value">{overallRating.toFixed(2)}</span> /
              5
            </h2>
            {hasIncompleteGoals && (
              <p>
                Note: Some goals are not counted in the overall rating due to
                their status.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
