import React from 'react';
import Navbar1 from './Navbar1'; 
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  

 return (
    <div>
 <Navbar1 currentPage="dashboard" />
      <div className="row1">

      <div className="column1" 
      style={{backgroundColor: 'white', boxShadow: '0px 0px 10px 0px rgba(37, 49, 109, 0.5), 0px 0px 5px 0px rgba(37, 49, 109, 0.5)', // Use #25316D as the color for the box shadow
      border: '1px solid #25316D'}}>
    <img src="goal.png" alt="Logo"></img>
    <h1>Create Goals</h1>
    <p>Goal setting involves the development of an action plan designed in order to motivate and guide a person or group toward a goal.</p>
    <button className="create-goal-button">Create Goal</button>
    </div>

        <div className="column1" 
        style={{backgroundColor: 'white',  boxShadow: '0px 0px 10px 0px rgba(37, 49, 109, 0.5), 0px 0px 5px 0px rgba(37, 49, 109, 0.5)', // Use #25316D as the color for the box shadow
        border: '1px solid #25316D'}}>
        <img src="track.png" alt="Logo"></img>
        <h1>Track Goals</h1>
         <p>setting clear milestones and regularly self-evaluating to see how you're progressing toward your desired results.</p>
         <Link to="/Trackgoal">
         <button className="Track-goal-button">Track Goal</button></Link>
    </div>
       
        <div className="column1" 
        style={{backgroundColor: 'white',  boxShadow: '0px 0px 10px 0px rgba(37, 49, 109, 0.5), 0px 0px 5px 0px rgba(37, 49, 109, 0.5)', // Use #25316D as the color for the box shadow
        border: '1px solid #25316D'}}>
        <img src="satisfaction.png" alt="Logo"></img> 
        <h1>Review Goals</h1>
        <p>Achievable goals keep employees motivated.There should be a clear way to measure an employee's progress.</p>
        <Link to="/Reviewpage">
        <button className="Review-goal-button">Review Goal</button></Link>

    </div>
      </div>
    </div>
 );
};

export default Dashboard;
