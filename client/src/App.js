import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import ProfilePage from './components/ProfilePage';
import TrackGoal from './components/Trackgoal';
import Mpage from './components/Mpage'; 
import Reviewpage from './components/Reviewpage';

import LandingPage from './components/LandingPage';
import About from './components/About';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Register  from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPass';
import Resetpass from './components/ResetPass';
import InvalidPage from './components/InvalidPage';


function App() {
 return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trackgoal" element={<TrackGoal />} />
        <Route path="/Mpage" element={<Mpage/>} />
        <Route path="/Reviewpage" element={<Reviewpage/>} />


        <Route path="/navbar" element={<Navbar/>}></Route>
         <Route path="/" element={<LandingPage />} />
         <Route path="/about" element={<About />} />
         <Route path="/footer" element={<Footer />} />
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}></Route>
         <Route path="/forgotpass" element={<ForgotPassword/>}/>
         <Route path="/resetPassword" element={<Resetpass/>}/>

         <Route path="*" element={<InvalidPage />} />

      </Routes>
 );
}

export default App;
