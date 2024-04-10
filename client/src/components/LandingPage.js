// src/LandingPage.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub } from 'react-icons/fa';
import { faUser, faSignInAlt, faQuestionCircle , faStar } from '@fortawesome/free-solid-svg-icons';
import { Link,NavLink } from 'react-router-dom';
import './LandingPage.css';
import Image from './img.jpg';
import Client from './Clients.jpg';
import Feedback from './feedback.jpg';
import Navbar from './Navbar';
import Footer from './Footer'


const LandingPage = () => {
 return (
  <>
  <Navbar/>
  
    <div className="container" style={{ fontFamily: 'Times New Roman, Times, serif' ,marginBottom:'50px'}}>
            <div className="landing-page">
                <h1 style={{color:"#1A89E4",fontSize:'50px'}}>Performance</h1> 
                <h1 style={{color:"#25316D",fontSize:'50px'}}>Appraisal</h1>
                <div style={{marginTop:'20px'}}>
                <p style={{fontSize:'15px'}}>Unlock your team's potential with a comprehensive performance management system.</p>
                <p style={{fontSize:'15px'}}>open and transparent communication between managers and employees.</p>
                </div>
            </div>
          <div className="image-column">
            <img src={Image} alt="Performance Appraisal" />
          </div>
    </div>
    <div className='image-client'>
        <img src={Client} alt="Client" style={{marginTop:'50px'}}/>
    </div>
    <div>
      <h2 style={{textAlign:'center',marginTop:'50px'}}>Why Choose Performance Appraisal?</h2>
    <div className='row' style={{margin:'60px',padding:'30px',wordSpacing: '6px'}}>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/open-source.webp" style={{height:'30px',marginBottom:'20px'}}/>
        <h4>100% open source</h4>
        <p>Everything we do is out in the open. With the flexibility that Open Source software provides, backed up by a community that will support you, there will never be a struggle for solutions.</p>
      </div>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/easy.webp" style={{height:'30px',marginBottom:'20px'}}/>
      <h4>Easy to use, easier to manage</h4>
        <p>Automate mundane tasks, and take charge of your processes. Performance Appraisal helps you manage complex workflows, structure your assignments and set up payroll with ease.</p>
      </div>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/freedom.webp" style={{height:'30px',marginBottom:'20px'}}/>
      <h4>We believe in the freedom of choice</h4>
        <p>Built on the flexible Performance Appraisal Framework, Performance Appraisal lets you configure and customize to your liking. Create reports, forms, custom fields, print formats, and change layouts on the fly!</p>
      </div>
      
    </div>

    <div className='row' style={{margin:'60px',padding:'30px',wordSpacing: '6px'}}>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/hr.webp" style={{height:'30px',marginBottom:'20px'}}/>

        <h4>Affordable and Inclusive</h4>
        <p>Performance Appraisal is built for everyone in the organization: Employees, Team, and Company. Deliver the best employee and HR experience with affordable pricing.</p>
      </div>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/brew.webp" style={{height:'30px',marginBottom:'20px'}}/>

      <h4>The perfect brew of me and you</h4>
        <p>With frequent updates, consistent support, and a user-first approach, we go above and beyond to deliver the product you need.</p>
      </div>
      <div className='col-md-4'>
      <img alt="Icon for 100% open source"  src="https://frappehr.com/files/clutter-free.webp" style={{height:'30px',marginBottom:'20px'}}/>

      <h4>Clutter-free experience</h4>
        <p>With a clean UI, powerful navigation, and easy communication tracking, Performance Appraisal provides a delightful experience by making processes less overwhelming.</p>
      </div>
      
    </div>
    </div>
    <div className='image-feedback'>
        <img src={Feedback} alt="Feedback" style={{marginTop:'50px'}}/>
    </div>
    
    <Footer/>
  </>
 );
};

export default LandingPage;
