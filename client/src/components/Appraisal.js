import React from 'react';
import Navbar1 from './Navbar1'; // Import the Navbar1 component
import './APpraisal.css'; // Make sure to import the CSS file
 
// Data Structure for Employees
const employees = [
 {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    managerName: "Jane Smith",
    managerRating: 2.5,
 },
 {
    id: 2,
    name: "Jane Doe",
    designation: "Product Manager",
    managerName: "John Smith",
    managerRating: 4.7,
 },
 // Add more employees as needed
];
 
// Appraisal Component
const AppraisalList = () => {
 return (
    <div className="appraisal-list">
      <h2>Appraisal List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Manager Name</th>
            <th>Manager Rating</th>
            <th>Appraisal Percentage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            // Calculate appraisal percentage based on manager's rating, capped at 20%
            const appraisalPercentage = Math.min(((employee.managerRating - 1) / 4) * 20, 20);
 
            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.managerName}</td>
                <td>{employee.managerRating}</td>
                <td>{appraisalPercentage.toFixed(2)}%</td>
                <td>
                 <button onClick={() => console.log(`Approved: ${employee.name}`)}>
                    Approve
                 </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
 );
};
 
const AppraisalPage = () => {
  return (
    <div>
      <Navbar1 currentPage="Trackgoal" /> {/* Render Navbar1 component for the entire page */}
      <AppraisalList /> {/* Render AppraisalList component here */}
    </div>
  );
};
 
export default AppraisalPage;