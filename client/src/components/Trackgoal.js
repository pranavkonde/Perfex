import React, { useState, useEffect, useContext } from "react";
import Navbar1 from "./Navbar1";
import "./TrackGoal.css";
import Profilesection from "./Profilesection";
import axios from "axios";
import * as XLSX from "xlsx";
import moment from "moment";

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState({});
  const [overallRating, setOverallRating] = useState(0);
  const [hasIncompleteGoals, setHasIncompleteGoals] = useState(false);
  const [showOverallRating, setShowOverallRating] = useState(false);
  const [profile, setProfile] = useState({});
  const [employeeId, setEmployeeId] = useState("");
  const [weightageInput, setWeightageInput] = useState("");

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

        setProfile(response.data);
        const goalsResponse = await axios.get(
          `http://localhost:5500/myGoals/getAllGoal/${token?.data?.employeeId}`
        );
        if (!goalsResponse?.data)
          throw new Error("Network response was not ok");
        console.log("AAAAAAAAAA",goalsResponse.data)
        setGoals(goalsResponse.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [selectedGoal]);

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

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5500/myGoals/trackGoalUpdate",
        selectedGoal
      );
      // console.log("NNNNNN",selectedGoal)
      if (response.status === 200) {
        setShowOverallRating(true);
      } else {
        console.error("Failed to update goal");
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleGoalSelect = (goalId) => {
    const goal = goals.find((goal) => goal.goalId === goalId);
    setSelectedGoal(goal);
  };

  const handleSaveAllGoals = () => {
    console.log("All goals saved:", goals);
    console.log("Overall Rating:", overallRating.toFixed(2));
    setShowOverallRating(true);
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

  const handleWeightageChange = (event) => {
    const newWeightage = event.target.value;
    setWeightageInput(newWeightage);
    const updatedGoal = { ...selectedGoal, weightage: newWeightage };
    updateGoal(updatedGoal);
 };
 
  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoal);
 };

  const handleEmployeeCommentChange = (event) => {
    const updatedComment = event.target.value;
    const updatedGoal = { ...selectedGoal, employeeComment: updatedComment };
    updateGoal(updatedGoal);
  };


  

 

  //   useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         const token = await axios.get('http://localhost:5500/employee/authenticate', {withCredentials: true});
  //         if(!token?.data) throw new Error('Network response was not ok');
  //         setEmployeeId(token?.data?.employeeId);

  //       const response = await axios.get(`http://localhost:5500/employee/${token?.data?.employeeId}`)
  //       if(!response?.data) throw new Error('Network response was not ok');

  //       const data = response?.data;
  //       console.log(data)

  //         setProfile(response.data);

  //         const goalsResponse = await axios.get(`http://localhost:5500/myGoals/getAllGoal/${token?.data?.employeeId}`);
  //         if (!goalsResponse?.data) throw new Error('Network response was not ok');
  //         setGoals(goalsResponse.data);

  //       } catch (error) {
  //         console.error('Error fetching profile:', error);
  //       }
  //     };

  //     fetchProfile();
  //  }, []);

  const exportToExcel = () => {
    const data = goals.map((goal) => {
      return {
        Title: goal.title,
        Description: goal.description,
        Rating: goal.rating,
        Status: goal.status,
        Priority: goal.priority,
        DueDate: goal.dueDate,
        Weightage: goal.weightage,
        overallRating: goal.ov,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Goals");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const fileName = "goals.xlsx";
    const downloadLink = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
                    <li
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.goalId)}
                    >
                      {goal.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="goal-details">
          {selectedGoal && (
            <>
              <h2>{selectedGoal.title}</h2>
              <p>
                <strong>Description:</strong> {selectedGoal.description}
              </p>
              <div className="employee-comment">
                <p>
                  <strong>
                    employee Comment:{" "}
                    <textarea
                      value={selectedGoal.employeeComment || ""}
                      onChange={handleEmployeeCommentChange}
                      placeholder="employee's comment..."
                    />{" "}
                  </strong>
                </p>
              </div>
              <div className="dropdown-container">
                <label>
                  <strong>Rating:</strong>{" "}
                  <select
                    value={selectedGoal.rating}
                    onChange={handleRatingChange}
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <strong>Status:</strong>{" "}
                  <select
                    value={selectedGoal.status}
                    onChange={handleStatusChange}
                  >
                    {["To Do", "In Progress", "Completed"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                {/* <label>
                    <strong>Priority:</strong>{' '}
                    <select value={selectedGoal.priority} onChange={handlePriorityChange}>
                      {['Low', 'Medium', 'High'].map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label> */}
                <label>
                  <strong>Due Date:</strong>{" "}
                  <input
                    type="date"
                    value={moment(selectedGoal.DueDate).format("YYYY-MM-DD")}
                    onChange={handleDueDateChange}
                    disabled
                  />
                </label>
                <label>
                <strong>Weightage:</strong>{" "}
                <input
                 type="string"
                 value={weightageInput}
                 onChange={handleWeightageChange}
                 min="0"
                 max="100"
                />
              </label>
                <button onClick={handleSave}>Save</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="overall-rating">
        {showOverallRating && (
          <>
            <div className="rating-section">
              <h2>
                Overall Rating:{" "}
                <span className="rating-value">{overallRating.toFixed(2)}</span>{" "}
                / 5
              </h2>
              {hasIncompleteGoals && (
                <p>
                  Note: Some goals are not counted in the overall rating due to
                  their status.
                </p>
              )}
            </div>
            <div className="button-section">
              <button onClick={exportToExcel} className="export-button">
                Export to Excel
              </button>
              {/* <button onClick={handleSaveAllGoals} className="save-button">
                Save All Goals
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
