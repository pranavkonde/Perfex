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

 const [errors, setErrors] = useState({});

 const navigate = useNavigate(); 

 const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Full name validation
    if (!/^[A-Za-z]+(?: [A-Za-z]+)?$/.test(formData.full_name)) {
        errors.full_name = "Invalid full name";
        isValid = false;
    }

    // Email validation
    if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        errors.email = "Invalid email";
        isValid = false;
    }

    // Phone number validation
    if (!/^[6-9]\d{9}$/.test(formData.phone_no)) {
        errors.phone_no = "Invalid phone number";
        isValid = false;
    }

    // Password validation
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(formData.password)) {
        errors.password = "Invalid password";
        isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        isValid = false;
    }


    // Department validation
    if (!formData.department) {
      errors.department = "Please select a department";
      isValid = false;
   }
    // Role validation
    if (!formData.role) {
      errors.role = "Please select a role";
      isValid = false;
  }
    // Employee Type validation
    if (!formData.employeeType) {
      errors.employeeType = "Please select an employee type";
      isValid = false;
  }

    setErrors(errors);
    return isValid;
 };

 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
        return; // Prevent form submission if validation fails
    }
    try {
        const { confirmPassword, ...fromData} = formData;
        console.log(fromData)
        const response = await axios.post('http://localhost:5500/employee/register', fromData, {withCredentials: true} );
        if (response.status === 200) {
            navigate('/otppage'); 
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
                 {errors.full_name && <p className="error-message">{errors.full_name}</p>}
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
                 {errors.email && <p className="error-message">{errors.email}</p>}
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
                 {errors.phone_no && <p className="error-message">{errors.phone_no}</p>}
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
                    <option value="" disabled selected hidden>Select Department</option>
                    <option>CEO/Founder</option>
                    <option>CTO</option>
                    <option>Vice President</option>
                    <option>IT/System Manager</option>
                    <option>Manager(Sales/Marketing/Cutomer)</option>
                    <option>Developer/Analyst</option>
                    <option>Freelancer/Contractor</option>
                    <option>Others</option>
                 </select>
                 {errors.department && <p className="error-message">{errors.department}</p>}
                </div>
                <div className="form-group">
                 <select
                    className="form-control"
                    id="formBasicRole"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder='Select Role'
                 >  
                    <option value="" disabled selected hidden>Select Role </option>
                    <option>Intern</option>
                    <option>FTE</option>
                    <option>SE-1/SE-2/SE-3</option>
                    <option>Team-Lead</option>
                    <option>Graphic/UI UX Designer</option>
                    <option>Customer/Sales/Marketing Manager</option>
                 </select>
                 {errors.role && <p className="error-message">{errors.role}</p>}
                </div>
                <div className="form-group">
                 <select
                    className="form-control"
                    id="formBasicEmployeeType"
                    name="employeeType"
                    value={formData.employeeType}
                    onChange={handleInputChange}
                 >
                    <option value="" disabled selected hidden >Select Employee Type</option>
                    <option>Manager</option>
                    <option>Employee</option>
                    <option>HR</option>
                    <option>Admin</option>
                 </select>
                 {errors.employeeType && <p className="error-message">{errors.employeeType}</p>}
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
                 {errors.password && <p className="error-message">{errors.password}</p>}
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
                 {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
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
