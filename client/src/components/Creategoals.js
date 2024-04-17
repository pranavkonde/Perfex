import React, { useContext, useState, useEffect } from "react";
import "./Creategoals.css";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import CreateGoalHR from "./CreateGoalHR";
import axios from "axios"; // Ensure axios is imported

const GoalsTable = () => {
  const [goals, setGoals] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [modifiedGoals, setModifiedGoals] = useState([]);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/goal/getAllGoal"
        );
        if (response.status === 200) {
          setGoals(response?.data);
        } else {
          console.error("Failed to fetch goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    const fetchAcceptedGoals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/myGoals/getAllGoal/${user?.employeeId}`
        );
        if (response.status === 200) {
          setSelectedGoals(response?.data);
        } else {
          console.error("Failed to fetch goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
    fetchAcceptedGoals();
  }, []);

  const handleAddGoal = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectGoal = async (goal) => {
    try {
      const dataObj = {
        userId: user?.employeeId,
        goalId: goal?._id,
        title: goal?.title,
        description: goal?.description,
        employeeType: goal?.employeeType,
      };
      const response = await axios.post(
        `http://localhost:5500/myGoals/acceptGoal/${goal._id}`,
        dataObj,
        { withCredentials: true }
      );
      if (response?.status === 200) {
        setSelectedGoals([...selectedGoals, goal]);
        setShowDropdown(false);
      } else {
        console.error("Failed to accept goals");
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const addGoalToTable = (goal) => {
    const newGoal = {
      title: goal,
      description: "",
      startDate: "",
      endDate: "",
      department: "",
    };
    setGoals([...goals, newGoal]);
  };

  const handleRemoveGoal = async (index, goalId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/myGoals/delete/${goalId}`
      );
      if (response?.status === 200) {
        const updatedGoals = [...selectedGoals];
        updatedGoals.splice(index, 1);
        setSelectedGoals(updatedGoals);
      } else {
        console.error("Failed to accept goals");
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleInputChange = async (index, field, value, goalId) => {
    const updatedGoals = [...selectedGoals];
    updatedGoals[index][field] = value;
    setSelectedGoals(updatedGoals);
  };

  const handleDateChange = (index, field, value) => {
    const updatedGoals = [...selectedGoals];
    updatedGoals[index][field] = value;
    setSelectedGoals(updatedGoals);
  };

  const handleAddModifiedGoal = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5500/myGoals/modify`,
        selectedGoals,
        { withCredentials: true }
      );
      if (response?.status === 200) {
        alert("Goals modified successfully!!!");
      } else {
        console.error("Failed to accept goals");
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  return (
    <div className='goals-container'>
      <header className='header'>
        <div className='navbar'>
          <Link to='/dashboard' className='dashboard-link'>
            <img src='image.ico' alt='Perfex' />
          </Link>
          <button className='add-goal-btn' onClick={handleAddGoal}>
            Goal Bank
          </button>
        </div>
      </header>
      <h1 className='page-title'>Create Your Goals</h1>
      {user?.employeeType === "HR" ? (
        <CreateGoalHR />
      ) : (
        <>
          <div>
            {showDropdown && (
              <div className='dropdown'>
                <div className='dropdown-content'>
                  <div className='goals-list'>
                    <div style={{ display: "flex" }}>
                      <h2 style={{ margin: "20px" }}>Goals List</h2>
                      <Link
                        style={{
                          marginLeft: "650px",
                          marginTop: "20px",
                          color: "black",
                          fontSize: "20px",
                        }}
                        onClick={handleAddGoal}
                      >
                        <MdCancel />
                      </Link>
                    </div>

                    {goals
                      ?.filter(
                        (goal) => goal?.employeeType === user?.employeeType
                      )
                      .map((goal, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectGoal(goal)}
                        >
                          {goal.title} (click to accept goal)
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <table className='goals-table'>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Goal Title</th>
                <th>Goal Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Project Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedGoals.map((goal, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{goal.title}</td>
                  <td>
                    <textarea
                      type='text'
                      value={goal.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type='date'
                      value={goal.startDate}
                      onChange={(e) =>
                        handleDateChange(index, "startDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='date'
                      value={goal.endDate}
                      onChange={(e) =>
                        handleDateChange(index, "endDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={goal.projectName}
                      onChange={(e) =>
                        handleInputChange(index, "projectName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleRemoveGoal(index, goal._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='submit-btn' onClick={handleAddModifiedGoal}>
            Submit Modified Goals
          </button>
        </>
      )}
    </div>
  );
};

export default GoalsTable;
