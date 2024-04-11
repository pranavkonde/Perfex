import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Otppage.css'; // Import the CSS file

const OTPPage = () => {
 const [otp, setOtp] = useState('');
 const [showSuccess, setShowSuccess] = useState(false); // State to control the visibility of the success message
 const navigate = useNavigate();

 const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setOtp(value);
    }
 };

 const verifyOTP = () => {
    navigate('/login');
 };

 const handleResendClick = () => {
    setShowSuccess(true); // Show the success message
    setTimeout(() => {
      setShowSuccess(false); // Hide the success message after 10 seconds
    }, 5000);
 };

 return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        maxLength="4"
        className="otp-input"
      />
      <p>Didn't get the code? <span onClick={handleResendClick} style={{color: 'blue', cursor: 'pointer'}}>Click to Resend</span></p>
      {showSuccess && <p style={{color:'green'}}>OTP sent successfully</p>}
      <button onClick={verifyOTP} className="verify-button">Verify</button>
    </div>
 );
};

export default OTPPage;
