import React, { useContext } from "react";
import "./Navbar1.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const Navbar1 = ({ currentPage }) => {
  const handlePerfexClick = () => {};

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    axios
      .get("http://localhost:5500/employee/logout", { withCredentials: true })
      .then((res) => {
        if (res?.status === 200) navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className='navbar'>
        <div className='navbar-item Company' onClick={handlePerfexClick}>
          <Link to='/dashboard' className='dashboard-link'>
            <img src='image.ico' alt='Perfex' />
          </Link>
        </div>
        {currentPage === "Trackgoal" ? (
          <></>
        ) : currentPage === "Reviewpage" ? (
          <></>
        ) : (
          <>
            {currentPage === "dashboard" ? (
              <div
                className='navbar-item profile'
                style={{ borderRadius: "8px", padding: "20px" }}
              >
                <button>
                  <Link to='/profile'>
                    <a href='/profile' className='profile-link'>
                      Profile
                    </a>
                  </Link>
                </button>
                {user?.employeeType === "Manager" && (
                  <>
                  {/* <button>
                    <Link to='/Mpage'>
                      <a href='/Mpage' className='Mpage-link'>
                        Manager
                      </a>
                    </Link>
                  </button> */}
                  <button>
                  <Link to="/notification">
                  <a className="notification-link">Requests</a>
                  </Link>
                  </button>
                  </>
                )}
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar1;
