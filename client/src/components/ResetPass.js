import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'; 

const Resetpass = () => {
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');

 const handlePasswordChange = (event) => {
    setPassword(event.target.value);
 };

 const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5500/employee/resetPassword', { password },{withCredentials:true});
      console.log("njsdchwjd",response.data)
      if (response.status === 200) {
        alert('Password reset successful.');
      } else {
        console.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
 };

 return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="formBasicPassword"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="formBasicConfirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button type="submit" className="login-button">Reset Password</button>
        </form>
      </div>
    </div>
 );
};

export default Resetpass;
