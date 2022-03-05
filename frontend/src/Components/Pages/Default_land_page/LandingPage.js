import React, { useState } from "react";
import "./LandingPage.css";
import CardWrap from "../../UI/CardWrap/CardWrap"
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";

function LandingPage(props) {
  const navigate = useNavigate();
 
  return (
    <div>
      <div className="land-container">
        <div className="land-split left">
          <p></p>
        </div>
        <CardWrap className="land-split right">
          <div>            
            
            <Routes>
            <Route path='*' element={<Login/>}></Route>
            {/* <Route path='login' element={<Login/>}></Route> */}
            
            <Route path="signup" element={<SignUp/>} />
            <Route path="forgotpassword" element={<ForgotPassword/>} />
            <Route path='resetpassword' element={<ResetPassword/>}/>
            </Routes>
            
            {/* <p>
              <NavLink to="/signup">SignUp</NavLink>
            </p> */}
          </div>
        </CardWrap>
      </div>
    </div>
  );
}

export default LandingPage;
