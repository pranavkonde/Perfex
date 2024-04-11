import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import './TrackGoal.css';
import Profilesection from './Profilesection';
;

const GoalTracker = () => {
  const initialGoals = [
    {
      id: 1,
      title: 'Team Work',
      description: '...........',
      rating: 1, // Default rating
      status: 'To Do', // Default status
      priority: 'Low', // Default priority
      dueDate: '',
      weightage: 10 // Weightage percentage for this goal
    },
    {
      id: 2,
      title: 'Leadership',
      description: '................',
      rating: 1, // Default rating
      status: 'To Do', // Default status
      priority: 'Low', // Default priority
      dueDate: '',
      weightage: 20 // Weightage percentage for this goal
    },
    {
      id: 3,
      title: 'Communication',
      description: '..........',
      rating: 1, // Default rating
      status: 'To Do', // Default status
      priority: 'Low', // Default priority
      dueDate: '',
      weightage: 10 // Weightage percentage for this goal
    },

    {
      id: 4,
      title: 'Conceptual Thinking',
      description: '..........',
      rating: 1, // Default rating
      status: 'To Do', // Default status
      priority: 'Low', // Default priority
      dueDate: '',
      weightage: 20 // Weightage percentage for this goal
  },

  {
    id: 5,
    title: 'Analytical Skills',
    description: '..........',
    rating: 1, // Default rating
    status: 'To Do', // Default status
    priority: 'Low', // Default priority
    dueDate: '',
    weightage: 40 // Weightage percentage for this goal
}
  ];
  

  
const [goals, setGoals] = useState(initialGoals);
const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
const [selectedGoal, setSelectedGoal] = useState(initialGoals[0]);
const [overallRating, setOverallRating] = useState(0);
const [hasIncompleteGoals, setHasIncompleteGoals] = useState(false);
const [showOverallRating, setShowOverallRating] = useState(false);

function calculateWeightedAverage(goals) {
  // Initialize variables
  let weightedSum = 0;
  let totalWeightage = 0;

  // Iterate over each goal
  goals.forEach(goal => {
      // Check if the goal is completed
      if (goal.status === 'Completed') {
          // Add the product of rating and weightage to the weighted sum
          weightedSum += goal.rating * goal.weightage;
          // Add the weightage to the total weightage
          totalWeightage += goal.weightage;
      }
  });

  // Calculate the weighted average
  let weightedAverage = 0;
  if (totalWeightage > 0) {
      weightedAverage = weightedSum / totalWeightage;
  }

  return weightedAverage;
}

  useEffect(() => {
    // Assuming `goals` is your state containing all goals
    const overallRating = calculateWeightedAverage(goals);
    setOverallRating(overallRating);
  }, [goals]); // Re-calculate whenever `goals` changes

  const handleSave = () => {
    console.log('Goals saved:', goals);
    console.log('Overall Rating:', overallRating.toFixed(2));
    setShowOverallRating(true); // Show the overall rating message
    // Add logic to save the goals to backend or perform other actions
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

  const updateGoal = (updatedGoal) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoal);
  };

  const profile = {
    name: 'John Doe',
    managerName: 'Jane Smith',
    role: 'Software Developer',
 };

  return (
    
    <div>
    <Navbar1 currentPage="Trackgoal" />
      <div className='profile-goaldetails'>
     <div style={{display:'flex', flexDirection:'column'}}>
     <Profilesection profile={profile} />
      <div className="goal-tracker">
        <div className="goal-container">
          <div className="goal-list">
            <h2>Goals:</h2>
            <ul>
              {goals.map((goal) => (
                
<li key={goal.id} onClick={() => handleGoalSelect(goal.id)}>

                  {goal.title}
                </li>
              ))}
            </ul>
          </div> 
         
          </div>
        </div>
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
                    <select value={selectedGoal.rating} onChange={handleRatingChange}>
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
                  <button onClick={handleSave}>Save</button>
                </div>
              </>
            )}
            </div>
      </div>

      <div className="overall-rating">
{showOverallRating && (
    <>
      <h2>Overall Rating: <span className="rating-value">{overallRating.toFixed(2)}</span> / 5</h2>
      {hasIncompleteGoals && <p>Note: Some goals are not counted in the overall rating due to their status.</p>}
    </>
)}
</div>

    </div>
  );
};

export default GoalTracker;