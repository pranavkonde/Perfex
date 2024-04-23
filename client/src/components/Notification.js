import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './Notification.css';
import Navbar1 from './Navbar1';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';


const Notification = () => {
 const [employees, setEmployees] = useState([]);
 const [approvedEmployees, setApprovedEmployees] = useState([]);
 const [rejectedEmployees, setRejectedEmployees] = useState([]);

 useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await axios.get('http://localhost:5500/employee/authenticate', { withCredentials: true });
 
        if (!token?.data) throw new Error('Network response was not ok');
        const responseEmp = await axios.get(`http://localhost:5500/employee/${token?.data?.employeeId}`);
        if (!responseEmp?.data) throw new Error('Network response was not ok');
        const data = responseEmp?.data;
      
        const mName = data.managerName

        const details= await axios.get(`http://localhost:5500/myGoals/getNotificationByManager/${mName}`);

        //Pending to Integrate (API--- /updateEmployee)

        // const response = await axios.get('/notification', {
        //   params: {
        //     userId: data, 
        //     goalId: 'yourGoalId', 
        //   },
        // });
        // const { goal, employee } = response.data;
        setEmployees(details.data);

      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
 }, []);

  const updateEmployee = async (userId, mg_rating, mg_comment, isVerified) => {
    try {
       const response = await axios.post('/updateEmployee', {
         userId,
         mg_rating,
         mg_comment,
         isVerified,
       });
       console.log('Employee updated:', response.data);
    } catch (error) {
       console.error('Error updating employee:', error);
    }
   };

   
const handleApprove = (index) => {
  const approvedEmployee = employees[index];
  setApprovedEmployees([...approvedEmployees, approvedEmployee]);
  const updatedEmployees = employees.filter((_, i) => i !== index);
  setEmployees(updatedEmployees);
 
  updateEmployee(approvedEmployee.userId, 5, 'Great job!', true);
 };
 

  const handleReject = (index) => {
    const rejectedEmployee = employees[index];
    setRejectedEmployees([...rejectedEmployees, rejectedEmployee]);
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <Navbar1 currentPage="Mpage" />
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
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.title}</td>
              <td>{employee.description}</td>
              <td>{employee.employeeComment}</td>
              <td>{employee.rating}</td>
              <td>{employee.status}</td>
              <td>{moment(employee.createdAt).format("YYYY-MM-DD")}</td>
              <td><textarea rows={2}></textarea></td>
              <td><input type='text' /></td>
              <td><button className='btn btn-sm' style={{ backgroundColor: '#25316D', color: 'white' }} onClick={() => handleApprove(index)}>Approve</button></td>
              <td><button className='btn btn-sm' style={{ backgroundColor: '#25316D', color: 'white' }} onClick={() => handleReject(index)}>Reject</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='approved-list'>
      <h2>Approved</h2>
      <ul>
        {approvedEmployees.map((employee, index) => (
          <li key={index}>{employee.name}</li>
        ))}
      </ul>

      <h2>Rejected</h2>
      <ul>
        {rejectedEmployees.map((employee, index) => (
          <li key={index}>{employee.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Notification;
