import React, { useState } from 'react';
import Navbar1 from './Navbar1';
import './APpraisal.css';
 
// Data Structure for Employees
const initialEmployees = [
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
 
const AppraisalPage = () => {
  // State to store the main appraisal list
  const [employees, setEmployees] = useState(initialEmployees);
 
  // State to store the approved entries
  const [approvedEntries, setApprovedEntries] = useState([]);
 
  // Function to handle approval of an employee
  const handleApprove = (employeeId) => {
    // Find the employee to be approved
    const approvedEmployee = employees.find(emp => emp.id === employeeId);
    // Update the main appraisal list by removing the approved employee
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    // Add the approved employee to the approved entries list
    setApprovedEntries(prevState => [...prevState, approvedEmployee]);
    // Update the state with the updated main appraisal list
    setEmployees(updatedEmployees);
  };
 
  return (
    <div>
      <Navbar1 currentPage="Trackgoal" />
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
              const appraisalPercentage = Math.min(((employee.managerRating - 1) / 4) * 20, 20);
 
              return (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.managerName}</td>
                  <td>{employee.managerRating}</td>
                  <td>{appraisalPercentage.toFixed(2)}%</td>
                  <td>
                    <button onClick={() => handleApprove(employee.id)}>Approve</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="approved-list">
        <h2>Approved Entries</h2>
        <ul>
          {approvedEntries.map((entry) => (
            <li key={entry.id}>{entry.name} - {((entry.managerRating - 1) / 4) * 20}%</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
 
export default AppraisalPage;
 