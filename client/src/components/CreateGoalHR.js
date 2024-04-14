import React, { useState } from 'react';
import './CreateGoalHR.css'; 

const CreateGoalHR = () => {
 // State to hold form values
 const [employeeType, setEmployeeType] = useState('');
 const [goalTitle, setGoalTitle] = useState('');
 const [goalDescription, setGoalDescription] = useState('');

 // Function to handle form submission
 const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Employee Type:', employeeType);
    console.log('Goal Title:', goalTitle);
    console.log('Goal Description:', goalDescription);
    // Here you can handle the form submission, e.g., send data to a server
 };

 return (
    <div>
      <form className="goal-form" onSubmit={handleSubmit}>
 <div className="form-group">
    <label htmlFor="employeeType">Employee Type:</label>
    <select
      id="employeeType"
      value={employeeType}
      onChange={(e) => setEmployeeType(e.target.value)}
      className="form-control"
    >
      <option value="">Select</option>
      <option value="Manager">Manager</option>
      <option value="Employee">Employee</option>
    </select>
 </div>
 <div className="form-group">
    <label htmlFor="goalTitle">Goal Title:</label>
    <input
      type="text"
      id="goalTitle"
      value={goalTitle}
      onChange={(e) => setGoalTitle(e.target.value)}
      className="form-control"
    />
 </div>
 <div className="form-group">
    <label htmlFor="goalDescription">Goal Description:</label>
    <textarea
      id="goalDescription"
      value={goalDescription}
      onChange={(e) => setGoalDescription(e.target.value)}
      className="form-control"
    />
 </div>
 <button type="submit" className="submit-btnHR">Submit</button>
</form>

    </div>
 );
};

export default CreateGoalHR;
