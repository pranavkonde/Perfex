import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaGithub } from 'react-icons/fa';
import { faUser, faSignInAlt, faQuestionCircle , faStar } from '@fortawesome/free-solid-svg-icons';
import { Link,NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
<nav style={{ fontFamily: 'Times New Roman, Times, serif' }}>
    
<ul>
    <img src='image.ico' alt='Perfex' className='navLogo'/>
    <li>
        <NavLink to="/login" activeClassName="active">
            <FontAwesomeIcon icon={faUser} /> Login
        </NavLink>
    </li>
    <li>
        <NavLink to="/register" activeClassName="active">
            <FontAwesomeIcon icon={faSignInAlt} /> Register
        </NavLink>
    </li>
    <li>
        <NavLink to="/about" activeClassName="active">
        <FontAwesomeIcon icon={faQuestionCircle} /> About
        </NavLink>
    </li>
    <li>
        <a href="https://github.com/pranavkonde/Perfex" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faStar} color="#FFD700"/> Star Us on GitHub
        </a>
    </li>
</ul>
</nav>
    )
};
export default Navbar;