import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Components/LandingPages/Login';
import SignUp from './Components/LandingPages/SignUp';
import LandingPage from './Components/LandingPages/LandingPage';
import Home from './Components/LandingPages/Home';
import {Routes, Route} from 'react-router-dom';
function App() {
  
  return (
    <div>
      {/* <Login/> */}
      {/* <Registration/> */}
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  );
}


export default App;
