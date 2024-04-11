import React, { useState } from 'react';
import Navbar from './Navbar';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'; 

const Register = () => {
 const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_no: '',
    department: '',
    role: '',
    employeeType: '',
    password: '',
    confirmPassword: '',
 });

 const navigate = useNavigate(); 

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const { confirmPassword, ...fromData} = formData;
        console.log(fromData)
      const response = await axios.post('http://localhost:5500/employee/register', fromData, {withCredentials: true} );
      if (response.status === 200) {
        navigate('/login'); 
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error?.message);
    }
 };



 return (
    <>
      <Navbar />
      <div className="RegisterContainer">
        <div className="row">
          <div className="col-md-6 form-sign1" style={{width:'35%'}}>
            <h1 className="welcome-message">Welcome Back</h1>
            <NavLink to='/login'><button className=" sign-in-button">Sign In</button></NavLink>
          </div>
          <div className="col-md-6 form">
            <div className="registration-form">
              <h1>Create Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                 <input
                    type="text"
                    className="form-control"
                    id="formBasicFullName"
                    placeholder="Enter full name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                 />
                </div>
                <div className="form-group">
                 <input
                    type="email"
                    className="form-control"
                    id="formBasicEmail"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                 />
                </div>
                <div className="form-group">
                 <input
                    type="tel"
                    className="form-control"
                    id="formBasicPhone"
                    placeholder="Enter phone number"
                    name="phone_no"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                 />
                </div>
                <div className="form-group">
                 <select
                    className="form-control"
                    id="formBasicDepartment"
                    style={{ marginBottom: '10px' }}
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                 >
                    <option>Select Department</option>
                    <option>Department 1</option>
                    <option>Department 2</option>
                 </select>
                </div>
                <div className="form-group">
                 <select
                    className="form-control"
                    id="formBasicRole"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                 >
                    <option>Select Role</option>
                    <option>Role 1</option>
                    <option>Role 2</option>
                 </select>
                </div>
                <div className="form-group">
                 <select
                    className="form-control"
                    id="formBasicEmployeeType"
                    name="employeeType"
                    value={formData.employeeType}
                    onChange={handleInputChange}
                 >
                    <option>Select Employee Type</option>
                    <option>Manager</option>
                    <option>Employee</option>
                    <option>HR</option>
                 </select>
                </div>
                <div className="form-group">
                 <input
                    type="password"
                    className="form-control"
                    id="formBasicPassword"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                 />
                </div>
                <div className="form-group">
                 <input
                    type="password"
                    className="form-control"
                    id="formBasicConfirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                 />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
 );
};

export default Register;
