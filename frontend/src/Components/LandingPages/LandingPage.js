import React, { useState } from "react";
import "./LandingPage.css";
import Card from "../UI/Card"
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function LandingPage(props) {
  const navigate = useNavigate();
 
  return (
    <div>
      <div className="land-container">
        <div className="land-split left">
          <p></p>
        </div>
        <Card className="land-split right">
          <div>            
            
            <Routes>
            <Route path='/' element={<Login/>}></Route>
            {/* <Route path='login' element={<Login/>}></Route> */}
            
            <Route path="signup" element={<SignUp/>} />
            <Route path="forgotpassword" element={<ForgotPassword/>} />
            <Route path='resetpassword' element={<ResetPassword/>}/>
            </Routes>
            
            {/* <p>
              <NavLink to="/signup">SignUp</NavLink>
            </p> */}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LandingPage;
