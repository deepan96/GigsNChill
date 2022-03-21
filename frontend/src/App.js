import './App.css';
import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { LoginStateContext, UserEmailStateConext } from './Components/Context';
import { RouteStack,LoginRouteStack } from './Components/Auth/RouteStack';
import MainHeader from './Components/UI/Header/MainHeader';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  return (
    <div>
      <LoginStateContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
        
        <MainHeader/>
        {console.log(isLoggedIn)}
        {!isLoggedIn ? RouteStack(): LoginRouteStack()}
      {/* <Routes>
        <Route path="/*" element={<LandingPage/>} />
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path='/resetpassword' element={<ResetPassword/>}/> */}
        {/* <Route path="/home" element={<Home/>} /> */}
      {/* </Routes> */}
      </LoginStateContext.Provider>
    </div>
  );
}


export default App;
