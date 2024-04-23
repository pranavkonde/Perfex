import React, { useContext, useEffect, useState } from 'react';
import './profileStyle.css';
import Navbar1 from './Navbar1';
import axios from 'axios';
import { UserContext } from '../App';
import moment from 'moment';
 
const ProfilePage = () => {
  // Initialize state for each form field
  const [full_name, setName] = useState('');
  const [empId, setEmpId] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone_no, setContact] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [address, setAddress] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [managerName, setManagerName] = useState('');
  // const [hrName, setHrName] = useState(''); // Removed HR Name
  const [manegerDetails, setManagerDetails] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');

  const {user, setUser} = useContext(UserContext);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await axios.get('http://localhost:5500/employee/authenticate', { withCredentials: true });
 
        if (!token?.data) throw new Error('Network response was not ok');
        const response = await axios.get(`http://localhost:5500/employee/${token?.data?.employeeId}`);
        if (!response?.data) throw new Error('Network response was not ok');
        const data = response?.data;
        console.log(data);
        setName(data.full_name);
        setEmpId(data.empId);
        setEmail(data.email);
        setGender(data.gender);
        setContact(data.phone_no);
        setCreatedAt(data.createdAt);
        setAddress(data.address);
        setDepartment(data.department);
        setRole(data.role);
        // setManagerName(data.managerName);
        // setHrName(data.hrName); // Removed HR Name
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const fetchMangerDetails = async () =>{
      try{
        const details = await axios.get('http://localhost:5500/employee/managers/getAllManagers', { withCredentials: true });
        if (!details?.data) throw new Error('Network response was not ok');
        console.log(details?.data)
        setManagerDetails(details?.data)
      }catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
    fetchData();
    fetchMangerDetails();
  }, []);
 


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
 
    // Prepare the data to be sent to the backend
    const profileData = {
      full_name,
      empId,
      email,
      gender,
      phone_no,
      createdAt,
      address,
      department,
      role,
      selectedManager,
      // hrName, // Removed HR Name
    };
 
    try {
      const response = await axios.put(`http://localhost:5500/employee/updateProfile/${user?.employeeId}`, profileData, { withCredentials: true });
 
      if (!response?.data) {
        throw new Error('Network response was not ok');
      }
      console.log(response?.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
 
  return (
    <div>
      <Navbar1 currentPage="profile" />
      <div className="row">
        <div className="column">
          <form className="profileForm" onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={full_name} onChange={(e) => setName(e.target.value)} required />
 
                <label htmlFor="employeeid">Employee ID:</label>
                <input type="text" id="employeeid" name="employeeid" value={empId} disabled  onChange={(e) => setEmpId(e.target.value)} required />
 
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} disabled /> {/* Disabled Email Field */}
 
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
 
                <label htmlFor="contact">Contact:</label>
                <input type="tel" id="contact" name="contact" value={phone_no} onChange={(e) => setContact(e.target.value)} required />
 
                <label htmlFor="dateOfJoining">Date of Joining:</label>
                <input type="date" id="dateOfJoining" name="dateOfJoining" value={moment(createdAt).format('YYYY-MM-DD')} disabled max={new Date().toISOString().split('T')[0]} />
              </div>
 
              <div>
                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" rows="4" cols="50" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
 
                <label htmlFor="setDepartment">Department:</label>
                <input type="text" id="department" name="department" value={department} disabled /> {/* Disabled Department Field */}
 
                <label htmlFor="role">Role:</label>
                <input type="text" id="role" name="role" value={role} disabled /> {/* Disabled Role Field */}
 
<label htmlFor="managerName">Manager Name:</label>
<select id="managerName" name="managerName" value={selectedManager} onChange={(e) => setSelectedManager(e.target.value)}>
 {/* Assuming you have an array of manager names */}
 {manegerDetails.map((manager, index) => (
    <option key={index} value={manager.full_name}>{manager.full_name}</option>
  ))}
</select>

                
              </div>
            </div>
            <button className="profileSaveButton" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default ProfilePage;
 