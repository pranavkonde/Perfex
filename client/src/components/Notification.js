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
 const [managerRating, setManagerRating] = useState("");
 const [managerComment, setManagerComment] = useState("")

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
        if (!details?.data) throw new Error('Network response was not ok');


        details?.data?.map(async (detail) => {

          const response = await axios.get(`http://localhost:5500/employee/${detail?.userId}`, {withCredentials: true})
          if (!response?.data) throw new Error('Network response was not ok');
          detail.name = response?.data?.full_name
          if(!detail.isApproved && detail.isApproved === "NA" ) setEmployees([...employees, detail]);
          else if(detail?.isApproved === "Approved") setApprovedEmployees([...approvedEmployees, detail]);
          else setRejectedEmployees([...rejectedEmployees, detail])
        })
        //Pending to Integrate (API--- /updateEmployee)

        // const response = await axios.get('/notification', {
        //   params: {
        //     userId: data, 
        //     goalId: 'yourGoalId', 
        //   },
        // });
        // const { goal, employee } = response.data;

        
        // console.log("KNVNRWRNNRV", updateEmployee )

      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
 }, []);

  // const updateEmployee = async (userId, mg_rating, mg_comment, isVerified) => {
  //   try {
  //      const response = await axios.post('/updateEmployee', {
  //        userId,
  //        mg_rating,
  //        mg_comment,
  //        isVerified,
  //      });
  //      console.log('Employee updated:', response.data);
  //   } catch (error) {
  //      console.error('Error updating employee:', error);
  //   }
  //  };

   
const handleApprove = async (index, employee) => {
  try{
    const objData = {
      userId: employee.userId,
      goalId: employee.goalId,
      mg_rating: managerRating,
      mg_comment: managerComment,
      isApproved: "Approved",
    }
    const response = await axios.post('http://localhost:5500/myGoals/updateEmployee', objData, {withCredentials:true});
    if(response?.status === 200) {
      const approvedEmployee = employees[index];
      setApprovedEmployees([...approvedEmployees, approvedEmployee]);
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
    }
    else throw new Error('Network response was not ok');
  } catch (error) {
    console.log("Error in handle approve", error);
  }
 };
 

  const handleReject = async (index, employee) => {
    try{
      const objData = {
        userId: employee.userId,
        goalId: employee.goalId,
        mg_rating: managerRating,
        mg_comment: managerComment,
        isApproved: "Rejected",
      }
      const response = await axios.post('http://localhost:5500/myGoals/updateEmployee', objData, {withCredentials:true});
      if(response?.status === 200) {
        const rejectedEmployee = employees[index];
        console.log(rejectedEmployee)
        setRejectedEmployees([...rejectedEmployees, rejectedEmployee]);
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
      }
      else throw new Error('Network response was not ok');
    } catch (error) {
      console.log("Error in handle approve", error);
    }
    
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
              <td>{employee.full_name}</td>
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
