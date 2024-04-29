import React, { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import axios from 'axios';
import './Notification.css';
import Navbar1 from './Navbar1';
import moment from 'moment';
 
const Notification = () => {
 const [employees, setEmployees] = useState([]);
 const [approvedEmployees, setApprovedEmployees] = useState([]);
 const [rejectedEmployees, setRejectedEmployees] = useState([]);
 const [managerRating, setManagerRating] = useState("");
 const [managerComment, setManagerComment] = useState("");
 const [showSuccess, setShowSuccess] = useState({ show: false, message: '' });
 
 useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await axios.get('http://localhost:5500/employee/authenticate', { withCredentials: true });
        if (!token?.data) throw new Error('Network response was not ok');
        const responseEmp = await axios.get(`http://localhost:5500/employee/${token?.data?.employeeId}`);
        if (!responseEmp?.data) throw new Error('Network response was not ok');
        const mName = responseEmp?.data?.managerName;
 
        const details = await axios.get(`http://localhost:5500/myGoals/getNotificationByManager/${mName}`);
        if (!details?.data) throw new Error('Network response was not ok');
 
        const newEmployees = await Promise.all(details?.data?.map(async (detail) => {
          const response = await axios.get(`http://localhost:5500/employee/${detail?.userId}`, {withCredentials: true});
          if (!response?.data) throw new Error('Network response was not ok');
          detail.name = response?.data?.full_name;
          return detail;
        }));
 
        setEmployees(newEmployees.filter(detail => detail.isApproved === "NA"));
        setApprovedEmployees(newEmployees.filter(detail => detail.isApproved === "Approved"));
        setRejectedEmployees(newEmployees.filter(detail => detail.isApproved === "Rejected"));
 
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
 
    fetchDetails();
 }, []);
 
 const handleApprove = async (index, employee) => {
    try {
      const objData = {
        userId: employee.userId,
        goalId: employee.goalId,
        mg_rating: managerRating,
        mg_comment: managerComment,
        isApproved: "Approved",
      };
      const response = await axios.post('http://localhost:5500/myGoals/updateEmployee', objData, {withCredentials:true});
      if(response?.status === 200) {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
        setApprovedEmployees([...approvedEmployees, employee]);
        setShowSuccess({ show: true, message: 'Employee goal Approved Successfully' }); // Show the success alert with a message
      setTimeout(() => {
        setShowSuccess({ show: false, message: '' }); // Hide the success alert after 1 second
      }, 1000);
      } else throw new Error('Network response was not ok');
    } catch (error) {
      console.log("Error in handle approve", error);
    }
 };
 
 const handleReject = async (index, employee) => {
    try {
      const objData = {
        userId: employee.userId,
        goalId: employee.goalId,
        mg_rating: managerRating,
        mg_comment: managerComment,
        isApproved: "Rejected",
      };
      const response = await axios.post('http://localhost:5500/myGoals/updateEmployee', objData, {withCredentials:true});
      if(response?.status === 200) {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
        setRejectedEmployees([...rejectedEmployees, employee]);
        setShowSuccess({ show: true, message: 'Employee goal Rejected Successfully' }); // Show the success alert with a message
      setTimeout(() => {
        setShowSuccess({ show: false, message: '' }); // Hide the success alert after 1 second
      }, 1000);
      } else throw new Error('Network response was not ok');
    } catch (error) {
      console.log("Error in handle reject", error);
    }
 };
 
 return (
    <div>
      <Navbar1 currentPage="Mpage" />
      <div className="Alert">
      {showSuccess.show && (
                 <Alert variant="success" onClose={() => setShowSuccess({ show: false, message: '' })} dismissible>
                 {showSuccess.message}
              </Alert>
              )}
              
      </div>
      <table className='noti-table'>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Goal Name</th>
            <th>Description</th>
            <th>Employee Comment</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Manager Comment</th>
            <th>Manager Rating</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.userId}>
              <td>{employee.name}</td>
              <td>{employee.title}</td>
              <td>{employee.description}</td>
              <td>{employee.employeeComment}</td>
              <td>{employee.rating}</td>
              <td>{employee.status}</td>
              <td>{moment(employee.createdAt).format("YYYY-MM-DD")}</td>
              <td><textarea rows={2} value={managerComment} onChange={e => setManagerComment(e.target.value)}></textarea></td>
              <td><input type='text' value={managerRating} onChange={e => setManagerRating(e.target.value)}/></td>
              <td><button className='btn btn-sm' style={{ backgroundColor: '#25316D', color: 'white' }} onClick={() => handleApprove(index, employee)}>Approve</button></td>
              <td><button className='btn btn-sm' style={{ backgroundColor: '#25316D', color: 'white' }} onClick={() => handleReject(index, employee)}>Reject</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{display:'flex'}}>
      <div className='Approve'>
        <h2>Approved List</h2>
        <table className='approve-table'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Manager Comment</th>
              <th>Manager Rating</th>
            </tr>
          </thead>
          <tbody>
            {approvedEmployees.map((employee,index)=>(
                <tr>
                <td  key={employee.userId} >{employee.name} </td>
                <td key={employee.mg_comment}>{employee.managerComment}</td>
                <td key={employee.mg_rating}>{employee.managerRating}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
        {/* <ul>
          {approvedEmployees.map((employee, index) => (
            <li key={employee.userId}>{employee.name}</li>
          ))}
        </ul> */}
        </div>


        <div className='Reject'>
        <h2>Rejected List</h2>
        <table className='reject-table'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Manager Comment</th>
              <th>Manager Rating</th>
            </tr>
          </thead>
          <tbody>
          {rejectedEmployees.map((employee,index)=>(
                <tr key={employee.userId}>
                <td >{employee.name} </td>
                <td key={employee.mg_comment}>{employee.managerComment}</td>
                <td key={employee.mg_rating}>{employee.managerRating}</td>
              </tr>
            ))}
            
          </tbody>
        </table>


        {/* <ul>
          {rejectedEmployees.map((employee, index) => (
            <li key={employee.userId}>{employee.name}</li>
          ))}
        </ul> */}
        
        </div>
      </div>
    </div>
 );
};
 
export default Notification;
 