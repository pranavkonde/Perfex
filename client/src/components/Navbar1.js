import React, { useContext ,useState} from "react";
import "./Navbar1.css";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const Navbar1 = ({ currentPage }) => {
  const handlePerfexClick = () => {};

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const handleLogout = async () => {
    axios
      .get("http://localhost:5500/employee/logout", { withCredentials: true })
      .then((res) => {
        if (res?.status === 200){
        setShowLogoutMessage(true);
        setTimeout(()=>{
          setShowLogoutMessage(false);
            navigate("/");
        },2000);
      }
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
                <button>
                <Link onClick={handleLogout}>
                  <a className="notification-link">Logout</a>
                  </Link>
                  </button>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {/* Popup message for logout success */}
      <div className="Alert">
      {showLogoutMessage && (
        <Alert className="logout-success-message" variant="success">
          Successfully logged out.
        </Alert>
      )}
      </div>
    </div>
    
  );
};

export default Navbar1;
