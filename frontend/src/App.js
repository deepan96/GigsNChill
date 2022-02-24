import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Components/LandingPages/Login';
import SignUp from './Components/LandingPages/SignUp';
import LandingPage from './Components/LandingPages/LandingPage';
import Home from './Components/LandingPages/Home';
import {Routes, Route} from 'react-router-dom';
import ForgotPassword from './Components/LandingPages/ForgotPassword';
function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}


export default App;
