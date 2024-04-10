import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import './ReviewPage.css';
 
const ManagerFeedback = () => {
  const initialGoals = [
    {
      id: 1,
      title: 'Team Work',
      description: '...........',
      rating: 1,
      status: 'To Do',
      priority: 'Low',
      dueDate: '',
      weightage: 10,
      managerRating: 0, // Add managerRating property
      managerComment: '' // Add managerComment property
    },
    {
        id: 2,
        title: 'Leadership',
        description: '...........',
        rating: 1,
        status: 'To Do',
        priority: 'Low',
        dueDate: '',
        weightage: 10,
        managerRating: 0, // Add managerRating property
        managerComment: '' // Add managerComment property
      },
      {
        id: 1,
        title: 'communication',
        description: '...........',
        rating: 1,
        status: 'To Do',
        priority: 'Low',
        dueDate: '',
        weightage: 10,
        managerRating: 0, // Add managerRating property
        managerComment: '' // Add managerComment property
      },
    // Add more goals as needed...
  ];
 
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState(initialGoals[0]);
  const [overallRating, setOverallRating] = useState(0);
  const [hasIncompleteGoals, setHasIncompleteGoals] = useState(false);
  const [showOverallRating, setShowOverallRating] = useState(false);
 
  function calculateWeightedAverage(goals) {
    const completedGoals = goals.filter((goal) => goal.status === 'Completed');
    const weightedSum = completedGoals.reduce((sum, goal) => sum + goal.rating * goal.weightage, 0);
    const totalWeightage = completedGoals.reduce((total, goal) => total + goal.weightage, 0);
    const weightedAverage = totalWeightage > 0 ? weightedSum / totalWeightage : 0;
    return weightedAverage;
  }
 
  useEffect(() => {
    const overallRating = calculateWeightedAverage(goals);
    setOverallRating(overallRating);
  }, [goals]);
 
  const handleSave = () => {
    console.log('Goals saved:', goals);
    console.log('Overall Rating:', overallRating.toFixed(2));
    setShowOverallRating(true);
    // Save goals to backend or perform other actions here
  };
 
  const handleGoalSelect = (goalId) => {
    const goal = goals.find((goal) => goal.id === goalId);
    setSelectedGoal(goal);
  };
 
  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    const updatedGoal = { ...selectedGoal, rating: newRating };
    updateGoal(updatedGoal);
  };
 
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    const updatedGoal = { ...selectedGoal, status: newStatus };
    updateGoal(updatedGoal);
  };
 
  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    const updatedGoal = { ...selectedGoal, priority: newPriority };
    updateGoal(updatedGoal);
  };
 
  const handleDueDateChange = (event) => {
    const newDueDate = event.target.value;
    const updatedGoal = { ...selectedGoal, dueDate: newDueDate };
    updateGoal(updatedGoal);
  };
 
  const handleManagerRatingChange = (event) => {
    const newManagerRating = parseInt(event.target.value);
    const updatedGoal = { ...selectedGoal, managerRating: newManagerRating };
    updateGoal(updatedGoal);
  };
 
  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal));
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoal);
  };

  const handleManagerCommentChange = (event) => {
    const newManagerComment = event.target.value;
    const updatedGoal = { ...selectedGoal, managerComment: newManagerComment };
    updateGoal(updatedGoal);
  };
 
  return (
    <div>
      <Navbar1 currentPage="Reviewpage" />
      <div className="goal-tracker">
        <div className="goal-container">
          <div className="goal-list">
            <h2>Goals:</h2>
            <ul>
              {goals.map((goal) => (
                
<li key = {goal.id} onClick={() => handleGoalSelect(goal.id)}>

                  {goal.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="goal-details">
            {selectedGoal && (
              <>
                <h2>{selectedGoal.title}</h2>
                <p>
                  <strong>Description:</strong> {selectedGoal.description}
                </p>
                <div className="dropdown-container">
                  <label>
                    <strong>Rating:</strong>{' '}
                    <select value={selectedGoal.rating} onChange={handleRatingChange} >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <strong>Status:</strong>{' '}
                    <select value={selectedGoal.status} onChange={handleStatusChange}>
                      {['To Do', 'In Progress', 'Completed'].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <strong>Priority:</strong>{' '}
                    <select value={selectedGoal.priority} onChange={handlePriorityChange}>
                      {['Low', 'Medium', 'High'].map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <strong>Due Date:</strong>{' '}
                    <input type="date" value={selectedGoal.dueDate} onChange={handleDueDateChange} />
                  </label>
                  <p>
                    <strong>Weightage:</strong> {selectedGoal.weightage}%
                  </p>
                  <div className="manager-feedback">
                    <label>
                      <strong>Manager Rating:</strong>{' '}
                      <select value={selectedGoal.managerRating || ''} onChange={handleManagerRatingChange}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="manager-comment">
                      <p>
                        <strong>Manager Comment: <textarea
                        value={selectedGoal.managerComment || ''}
                        onChange={handleManagerCommentChange}
                        placeholder="manager's comment..."
                      />      </strong>
                      </p>
                                    </div>
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="overall-rating">
        {showOverallRating && (
          <>
            <h2>
              Overall Rating: <span className="rating-value">{overallRating.toFixed(2)}</span> / 5
            </h2>
            {hasIncompleteGoals && <p>Note: Some goals are not counted in the overall rating due to their status.</p>}
          </>
        )}
      </div>
    </div>
  );
};
 
export default ManagerFeedback;