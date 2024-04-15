import React, { useState } from "react";
import "./CreateGoalHR.css";
import axios from 'axios';


const CreateGoalHR = () => {
  const [employeeType, setEmployeeType] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       const formData = {
         employeeType: employeeType,
         title: goalTitle, 
         description: goalDescription
       };
   
       const response = await axios.post(
         "http://localhost:5500/goal/createGoalHR",
         formData,
         { withCredentials: true }
       );
       if (response.status === 200) {
         console.log("Goal created successfully");
       }
    } catch (error) {
       console.error("Error:", error);
    }
   };
   

  return (
    <div>
      <form className='goal-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='employeeType'>Employee Type:</label>
          <select
            id='employeeType'
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            className='form-control'
          >
            <option value=''>Select</option>
            <option value='Manager'>Manager</option>
            <option value='Employee'>Employee</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='goalTitle'>Goal Title:</label>
          <input
            type='text'
            id='goalTitle'
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='goalDescription'>Goal Description:</label>
          <textarea
            id='goalDescription'
            value={goalDescription}
            onChange={(e) => setGoalDescription(e.target.value)}
            className='form-control'
          />
        </div>
        <button type='submit' className='submit-btnHR'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGoalHR;
