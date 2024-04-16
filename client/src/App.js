import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import TrackGoal from "./components/Trackgoal";
import Mpage from "./components/Mpage";
import Reviewpage from "./components/Reviewpage";
import GoalsTable from "./components/Creategoals";
import Hrpage from "./components/Hrpage";
import Appraisal from "./components/Appraisal";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPass";
import Resetpass from "./components/ResetPass";
import InvalidPage from "./components/InvalidPage";
import OTPPage from "./components/OtpPage";
import CreateGoalHR from "./components/CreateGoalHR";
import ContactForm from "./components/ContactUs";

export const UserContext = createContext({});

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      axios
        .get("http://localhost:5500/employee/authenticate", {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res?.data);
        })
        .catch((err) => console.error(err));
    };
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/trackgoal' element={<TrackGoal />} />
        <Route path='/Mpage' element={<Mpage />} />
        <Route path='/Reviewpage' element={<Reviewpage />} />
        <Route path='/Hrpage' element={<Hrpage />} />
        <Route path='/Appraisal' element={<Appraisal />} />

        <Route path='/navbar' element={<Navbar />}></Route>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpass' element={<ForgotPassword />} />
        <Route path='/resetPassword' element={<Resetpass />} />

        <Route path='/createGoal' element={<GoalsTable />} />
        <Route path='*' element={<InvalidPage />} />
        <Route path='/otppage' element={<OTPPage />} />

        <Route path='/createGoalHR' element={<CreateGoalHR />} />
        <Route path="/contactForm" element={<ContactForm/>}/>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
