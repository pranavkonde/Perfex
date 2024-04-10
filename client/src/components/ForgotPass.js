import React, { useState } from 'react';
import './Forgotpass.css'; // Import the CSS file
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'; // Import axios

const ForgotPassword = () => {
 const [email, setEmail] = useState('');

 const handleInputChange = (event) => {
    setEmail(event.target.value);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/employee/forgotPassword', { email }, {withCredentials:true});
      console.log("asdfdsd",response.data)
      if (response.status === 200) {
        // Assuming the backend sends a success message or status
        // You can show a success message to the user
        alert('Reset link sent to your email.');
      } else {
        // Handle error
        console.error('Failed to send reset link');
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
    }
 };

 return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="formBasicEmail"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="login-button">Send reset link</button>
        </form>
      </div>
    </div>
 );
};

export default ForgotPassword;
