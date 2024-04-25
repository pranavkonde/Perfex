import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { UserContext } from "../App";

const Login = () => {
 const [formData, setFormData] = useState({
    email: "",
    password: "",
 });
 const [showSuccess, setShowSuccess] = useState(false); // State for success message

 const navigate = useNavigate();
 const { user, setUser } = useContext(UserContext);

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/employee/login",
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log(user);
        setShowSuccess(true); 
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 2000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
 };

 return (
    <>
      <Navbar />
      <div className="Alert">
      {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} >
                 Successfully logged in!
                </Alert>
              )}
      </div>        
      <div className='custom-container'>
        <div className='row'>
          <div className='col-md-6 form1'>
            <div className='login-form'>
              <h1>Login to Your Account</h1>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                 <input
                    type='email'
                    className='form-control'
                    id='formBasicEmail'
                    placeholder='Enter email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                 />
                </div>
                <div className='form-group'>
                 <input
                    type='password'
                    className='form-control'
                    id='formBasicPassword'
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                 />
                </div>
                <div className='forgot-password'>
                 <Link to='/forgotpass' style={{ color: "#25316D" }}>
                    Forgot Password?
                 </Link>
                </div>
                <button type='submit' className='login-button'>
                 Sign In
                </button>
              </form>
              
            </div>
          </div>
          <div className='col-md-6 form-sign1'>
            <h1 className='message'>New User?</h1>
            <NavLink to='/register'>
              <button className='sign-up-button'>Sign Up</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
 );
};

export default Login;
