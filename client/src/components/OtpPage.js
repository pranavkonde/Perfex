import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Otppage.css";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const verifyOTP = async (event) => {
    event.preventDefault();
    try {
      const token = await axios.get(
        "http://localhost:5500/employee/authenticate",
        { withCredentials: true }
      );
      if (!token?.data) throw new Error("Network response was not ok");

      const dataObj = { employeeId: token?.data?.employeeId, otp: otp };

      const response = await axios.post(
        "http://localhost:5500/employee/verify",
        dataObj,
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Verification failed", response?.data);
      }
    } catch (error) {
      console.error("Error during verification:", error?.message);
    }
  };

  const handleResendClick = async () => {
    try {
       const token = await axios.get(
        "http://localhost:5500/employee/authenticate",
        { withCredentials: true }
      );
       const employeeId = token.data.employeeId; 
      
       const response = await axios.post(
         "http://localhost:5500/employee/resendOtp",
         { employeeId },
         { withCredentials: true }
       );
   
       if (response.status === 200) {
         setShowSuccess(true);
         setTimeout(() => {
           setShowSuccess(false);
         }, 5000);
       } else {
         console.error("Failed to resend OTP", response?.data);
       }
    } catch (error) {
       console.error("Error during resend OTP:", error?.message);
    }
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
      <p>
        Didn't get the code?{" "}
        <span
          onClick={handleResendClick}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Click to Resend
        </span>
      </p>
      {showSuccess && <p style={{ color: "green" }}>OTP sent successfully</p>}
      <button onClick={verifyOTP} className="verify-button">
        Verify
      </button>
    </div>
  );
};

export default OTPPage;
