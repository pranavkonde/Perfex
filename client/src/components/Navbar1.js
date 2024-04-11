import React from 'react';
import './Navbar1.css';
import { Link } from 'react-router-dom';

const Navbar1 = ({ currentPage }) => {
 const handlePerfexClick = () => {
 };

 return (
    <div>
      <div className="navbar">
        <div className="navbar-item Company" onClick={handlePerfexClick}>
          <Link to="/dashboard" className="dashboard-link">
            <img src="image.ico" alt="Perfex" />
          </Link>
        </div>       
        {currentPage === 'Trackgoal' ? (
          <>
          </>
        ) :
         currentPage === 'Reviewpage' ? (
          <>
          
          </>
        ) : 
         (
          <>
            {currentPage === 'dashboard' ? (
              <div className="navbar-item profile">
                <Link to="/profile">
                 <a href="/profile" className="profile-link">Profile</a>
                </Link>

                <div className="navbar-item profile">
                <Link to="/Mpage">
                 <a href="/Mpage" className="Mpage-link">Manager</a>
                </Link>
              </div>
              </div>
            ) : (
              <div className="navbar-item logout">
                <span>Logout</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
 );
};

export default Navbar1;
