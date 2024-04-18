import React, { useEffect, useState } from 'react';
import Navbar1 from './Navbar1';
import './APpraisal.css';
import axios from "axios";

const AppraisalPage = () => {
 const [employees, setEmployees] = useState([]);
 const [approvedEntries, setApprovedEntries] = useState([]);
 const [isLoading, setIsLoading] = useState(true); 

 const handleApprove = (employeeId) => {
  const approvedEmployee = employees.find(emp => emp._id === employeeId);
  if (!approvedEmployee) {
     console.error(`Employee with ID ${employeeId} not found.`);
     return; 
  }
  const updatedEmployees = employees.filter(emp => emp._id !== employeeId);
  setApprovedEntries(prevState => [...prevState, approvedEmployee]);
  setEmployees(updatedEmployees);
 };
 

 useEffect(() => {
    const fetchAppraisal = async () => {
      try {
        const tokenResponse = await axios.get(
          "http://localhost:5500/employee/authenticate",
          { withCredentials: true }
        );
        if (!tokenResponse?.data) throw new Error("Network response was not ok");

        const employeeResponse = await axios.get(
          `http://localhost:5500/employee/${tokenResponse?.data?.employeeId}`
        );
        if (!employeeResponse?.data) throw new Error("Network response was not ok");

        setEmployees([employeeResponse.data]);

        const appraisalResponse = await axios.get(
          `http://localhost:5500/GetAllAppraisalActionList`
        );
        if (!appraisalResponse?.data) throw new Error("Network response was not ok");


      } catch (error) {
        console.error("Error fetching Appraisal:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAppraisal();
 }, []);

 if (isLoading) {
    return <div>Loading...</div>; 
 }

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
                <tr key={employee._id}>
                 <td>{employee.full_name}</td>
                 <td>{employee.department}</td>
                 <td>{employee.managerName}</td>
                 <td>{employee.managerRating}</td>
                 <td>{appraisalPercentage.toFixed(2)}%</td>
                 <td>
                    <button onClick={() => handleApprove(employee._id)}>Approve</button>
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
            <li key={entry._id}>{entry.full_name} - {((entry.managerRating - 1) / 4) * 20}%</li>
          ))}
        </ul>
      </div>
    </div>
 );
};

export default AppraisalPage;
