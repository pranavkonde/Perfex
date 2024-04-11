import React, { useState } from 'react';
import './MPage.css'; 
import Navbar1 from './Navbar1';

 
const Trackgoal = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'Pending', employeeName: 'John Doe', comment: '' },
    { id: 2, title: 'Task 2', status: 'Approved', employeeName: 'Jane Smith', comment: '' },
    { id: 3, title: 'Task 3', status: 'Rejected', employeeName: 'Alice Johnson', comment: '' },
    { id: 4, title: 'Task 3', status: 'Rejected', employeeName: 'Alice Johnson', comment: '' },
    { id: 5, title: 'Task 3', status: 'Rejected', employeeName: 'Alice Johnson', comment: '' },
    { id: 6, title: 'Task 3', status: 'Rejected', employeeName: 'Alice Johnson', comment: '' },
    { id: 7, title: 'Task 3', status: 'Rejected', employeeName: 'Alice Johnson', comment: '' },
    { id: 8, title: 'Task 4', status: 'Pending', employeeName: 'Bob Brown', comment: '' },
  ]);
 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
 
  const handleCommentChange = (taskId, event) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, comment: event.target.value } : task
    );
    setTasks(newTasks);
  };
 
  const renderTasksByStatus = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        
<div key ={task.id} className="task" onClick={() => setSelectedEmployee(task)}>

          {task.employeeName}
          {(task.status === 'Pending' || task.status === 'Rejected') && (
            <div className="button-container">
              <button onClick={(event) => {
                event.stopPropagation(); 
                acceptTask(task.id, 'Accept');
              }}>Accept</button>
              {task.status === 'Pending' && (
                <button onClick={(event) => {
                  event.stopPropagation(); 
                  acceptTask(task.id, 'Reject');
                }}>Reject</button>
              )}
            </div>
          )}
          {task.status === 'Pending' && (
            <div className="comment-container">
              <input
                type="text"
                placeholder="Add comment"
                value={task.comment}
                onChange={(event) => handleCommentChange(task.id, event)}
                onClick={(event) => event.stopPropagation()} 
              />
            </div>
          )}
        </div>
      ));
  };
 
  const acceptTask = (taskId, action) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (action === 'Accept') {
          return { ...task, status: 'Approved' };
        } else if (action === 'Reject') {
          return { ...task, status: 'Rejected' };
        }
      }
      return task;
    }));
  };
 
  const closeModal = () => {
    setSelectedEmployee(null);
  };
 
  return (
    <div>
    <Navbar1 currentPage="Mpage" />

    <div className="task-tracker">
      <div className="mpageColumn">
        <div className="mpageColumn-header">
          <h2>Approved</h2>
        </div>
        <div className="mpageColumn-content">
          {renderTasksByStatus('Approved')}
        </div>
      </div>
      <div className="mpageColumn">
        <div className="mpageColumn-header">
          <h2>Pending</h2>
        </div>
        <div className="mpageColumn-content">
          {renderTasksByStatus('Pending')}
        </div>
      </div>
      <div className="mpageColumn">
        <div className="mpageColumn-header">
          <h2>Rejected</h2>
        </div>
        <div className="mpageColumn-content">
          {renderTasksByStatus('Rejected')}
        </div>
      </div>
      {selectedEmployee && (
        <div className="employee-details-modal" onClick={closeModal}>
          <div className="employee-details-modal-content" onClick={(event) => event.stopPropagation()}>
            <h3>Employee Details</h3>
            <p>Name: {selectedEmployee.employeeName}</p>
            <p>Task: {selectedEmployee.title}</p>
            <p>Comment: {selectedEmployee.comment}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
            </div>

  );
};
 
export default Trackgoal;