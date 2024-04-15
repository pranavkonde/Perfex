import React, { useContext, useState, useEffect } from "react";
import "./Creategoals.css";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import CreateGoalHR from "./CreateGoalHR";
import axios from 'axios'; // Ensure axios is imported

const GoalsTable = () => {
 const [goals, setGoals] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 const [selectedGoal, setSelectedGoal] = useState("");
 const [modifiedGoals, setModifiedGoals] = useState([]);

 const { user, setUser } = useContext(UserContext);

 useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:5500/goal/getAllGoal");
        if (response.status === 200) {
          setGoals(response.data);
        } else {
          console.error("Failed to fetch goals");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
 }, []);

 const handleAddGoal = () => {
    setShowDropdown(!showDropdown);
 };

 const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setShowDropdown(true);
    addGoalToTable(goal);
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
    setSelectedGoal("");
 };

 const handleRemoveGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    setGoals(updatedGoals);
 };

 const handleInputChange = (index, field, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][field] = value;
    setGoals(updatedGoals);
 };

 const handleDateChange = (index, field, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][field] = value;
    setGoals(updatedGoals);
 };

 const handleAddModifiedGoal = () => {
    setModifiedGoals([...modifiedGoals, ...goals]);
    setGoals([]);
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
                      .filter(goal => goal.employeeType === user?.employeeType)
                      .map((goal, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectGoal(goal)}
                        >
                          {goal.title}
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
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr key={index}>
                 <td>{index + 1}</td>
                 <td>{goal.title}</td>
                 <td>
                    <input
                      type='text'
                      value={goal.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
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
                      value={goal.department}
                      onChange={(e) =>
                        handleInputChange(index, "department", e.target.value)
                      }
                    />
                 </td>
                 <td>
                    <button onClick={() => handleRemoveGoal(index)}>
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
