import React from 'react';
import './About.css';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
 return (
  <>
  <Navbar/>
    <div className="about-container">
      <h1 style={{fontSize:'50px'}}>About Us</h1>
      <ul>
        <li>Welcome to our Performance Management System, a cutting-edge tool designed to enhance productivity, engagement, and overall performance within your organization. Our system is built to support the dynamic needs of modern workplaces, providing a comprehensive platform for managing and evaluating employee performance.</li>
      </ul>
      <div>
        <ul>
        <h2>Our Mission</h2>
        <li>Our mission is to empower organizations with the tools and insights needed to align individual performance goals with business objectives, fostering a culture of continuous improvement and growth. We believe in the power of open and transparent communication between managers and employees, and we're committed to creating a system that supports this.</li>
        </ul>
      </div>
      <div>
        <h2>Key Features</h2>
        <ul>
          <li>Goal Setting and Tracking: Our system allows for the creation of any number of goals, spanning different periods and performance reviews. Goals can be simple or complex, depending on your needs. We provide a structured approach to goal setting, including short names, detailed descriptions, start and completion dates, and goal categories for easy organization </li>
          <li>Workflow for Performance Management: We offer a streamlined workflow for the approval and review process. From the initial creation of a review to the final review and completion, our system ensures that both managers and employees are involved in the process, promoting transparency and collaboration</li>
          <li>Ratings and Feedback: We facilitate the application of ratings to any goal or competency on the review. Our system supports the definition of rating models for each review, ensuring consistency and fairness in performance evaluations</li>
          <li>Performance Feedback and Monitoring: Our platform provides timely feedback, employee recognition, and guidance for continuous skill development. We enable accurate and consistent performance assessments, helping to evaluate the workforce’s contribution to the business</li>
        </ul>
      </div>
      <div>
      <h2>Why Choose Our System?</h2>
      <ul>
        <li>Employee Engagement and Satisfaction: By aligning current employee performance with smart goals and business objectives, we increase employee engagement and satisfaction. Our system is designed to support the development of a skilled workforce, building and empowering your team </li>
        <li>Strategic Improvement: Our performance management system helps HR professionals strategically improve employee performance, supporting organizational effectiveness, productivity, and adaptability. We enable the creation of personalized career development plans, providing employees with a clear trajectory for growth and improvement</li>
        <li>User-Friendly Interface: We prioritize user experience, making it simple to track goals, share feedback, hold 1-on-1s, conduct performance reviews, and much more. Our system is designed to be intuitive and accessible, ensuring that all users can easily navigate and utilize its features</li>
      </ul>
      </div>
    </div>
    <Footer/>
    </>  
 );
};

export default About;
