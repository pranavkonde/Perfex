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
              <div className="navbar-item profile" style={{borderRadius:'8px' , padding:'20px'}}>
                <button>
                <Link to="/profile">
                 <a href="/profile" className="profile-link">Profile</a>
                </Link>
                </button>
                <button>
                <Link to="/Mpage">
                 <a href="/Mpage" className="Mpage-link">Manager</a>
                </Link>
                </button>
                <button>
                <Link to="/Hrpage">
                 <a href="/Hrpage" className="Hrpage-link">Hrpage</a>
                </Link>
                </button>
                
              
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
