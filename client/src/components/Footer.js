import React from 'react';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSignInAlt, faQuestionCircle , faStar } from '@fortawesome/free-solid-svg-icons';
import { Link,NavLink } from 'react-router-dom';

const Footer = () => {
 const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
 };

 return (
    <div className='page-container'>
      <footer className='site-footer'>
        <div className='footer-container'>
          <div className='footer-nav'>
            <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/contactForm'>Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className='footer-bottom' onClick={scrollToTop}>
        <p>&copy; 2024 Perfex. All rights reserved.</p>
        </div>
      </footer>
    </div>
 );
};

export default Footer;
