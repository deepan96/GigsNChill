import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Components/LandingPages/Login';
import SignUp from './Components/LandingPages/SignUp';
import LandingPage from './Components/LandingPages/LandingPage';
import Home from './Components/LandingPages/Home';
import {Routes, Route} from 'react-router-dom';
import { LoginStateContext } from './Components/Context';
import ForgotPassword from './Components/LandingPages/ForgotPassword';
import ResetPassword from './Components/LandingPages/ResetPassword';
import MainHeader from './Components/UI/MainHeader';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <LoginStateContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
        <MainHeader/>
      <Routes>
        <Route path="/*" element={<LandingPage/>} />
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path='/resetpassword' element={<ResetPassword/>}/> */}
        <Route path="/home" element={<Home/>} />
      </Routes>
      </LoginStateContext.Provider>
    </div>
  );
}


export default App;
