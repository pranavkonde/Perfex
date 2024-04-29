import React, { useEffect, useState } from 'react';
import Navbar1 from './Navbar1';
import './Appraisal.css';
import axios from "axios";
import jsPDF from 'jspdf';
 
const AppraisalPage = () => {
 const [employees, setEmployees] = useState([]);
 const [approvedEntries, setApprovedEntries] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 
 const handleApprove = async (employeeId) => {
  const approvedEmployee = employees.find(emp => emp._id === employeeId);
  if (!approvedEmployee) {
      console.error(`Employee with ID ${employeeId} not found.`);
      return;
  }
  const updatedEmployees = employees.filter(emp => emp._id !== employeeId);
  setApprovedEntries(prevState => [...prevState, approvedEmployee]);
  setEmployees(updatedEmployees);
 
  // Create appraisal PDF
  const doc = new jsPDF();
  const appraisalPercentage = Math.min(((approvedEmployee.managerRating - 1) / 4) * 20, 20);
  const appraisalMessage = `Dear ${approvedEmployee.full_name},\n\nCongratulations! Your appraisal has been approved.\n\nYour Appraisal Percentage: ${appraisalPercentage.toFixed(2)}%\n\nBest regards,\n Parkar Digital`;
  doc.text(appraisalMessage, 10, 10);
  doc.save(`${approvedEmployee.full_name}_Appraisal.pdf`);
};
 

 useEffect(() => {
    const fetchAppraisal = async () => {
      try {
        const tokenResponse = await axios.get(
          "http://localhost:5500/employee/authenticate",
          { withCredentials: true }
        );
        if (!tokenResponse?.data) throw new Error("Network response was not ok");
 
     
 
        const appraisalResponse = await axios.get(
          `http://localhost:5500/myGoals/getGoalForAppraisal`
        );
        if (!appraisalResponse?.data) throw new Error("Network response was not ok");
        console.log("asasdsasdsdsd",appraisalResponse.data)
        // setEmployees(appraisalResponse.data);


        // const employeeResponse = await axios.get(
        //   `http://localhost:5500/employee/${appraisalResponse?.data?.userId}`
        // );
        // if (!employeeResponse?.data) throw new Error("Network response was not ok"); 

        // console.log("name",employeeResponse.data.full_name)

        const newEmployees = await Promise.all(appraisalResponse?.data?.map(async (detail) => {
          const response = await axios.get(`http://localhost:5500/employee/${detail?.userId}`, {withCredentials: true});
          if (!response?.data) throw new Error('Network response was not ok');
          detail.full_name = response?.data?.full_name;
          detail.role = response?.data?.role;
          return detail;
        }));
        setEmployees(newEmployees)
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
              <th>Role</th>
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
                 <td>{employee.role}</td>
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