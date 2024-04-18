import React, { useEffect } from 'react';
import './Notification.css' 
import Navbar1 from './Navbar1';
import { Dropdown } from 'react-bootstrap';

const Notification = () => {
  const employees = [
    { name: 'John Doe',goal_name:'Get review from manager', description: 'Software Engineer', comment: 'Excellent employee', rating: 4.5,status:'In progress',due_date:'12/24/24',mg_rating:'4.5',mg_comment:'xyz'},
    { name: 'Jane Smith', goal_name:'Parkar Digital',description: 'Project Manager', comment: 'Great leadership skills', rating: 4.2,status:'Completed',due_date:'12/24/24',mg_rating:'4.5',mg_comment:'xyz'},
    { name: 'Mike Johnson',goal_name:'Do tasks assigned', description: 'UI/UX Designer', comment: 'Creative and detail-oriented', rating: 4.7, status:'To do',due_date:'12/24/24',mg_rating:'4.5',mg_comment:'xyz'},
    // Add more employee data as needed
    

   
  ];

 

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
            <td>{employee.goal_name}</td>
            <td>{employee.description}</td>
            <td>{employee.comment}</td>
            <td>{employee.rating}</td>
            <td>{employee.status}</td>
            <td>{employee.due_date}</td>
            {/* <td>{employee.mg_comment}</td> */}
            <td><textarea rows={2}></textarea></td>
            <td>
              <input type='text'/>
            </td>
            <td><button className='btn btn-sm' style={{backgroundColor:'#25316D',color:'white'}}>Approve</button></td>
            <td><button className='btn btn-sm'style={{backgroundColor:'#25316D',color:'white'}}>Reject</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Notification;
