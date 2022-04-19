import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import LandingPage from "../Pages/Default_land_page/LandingPage";
import EventPage from "../Pages/Events/EventPage";
import Profile from "../Pages/Profile/Profile";
import HostEvent from "../Pages/HostEvent/HostEvent";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";

export function RouteStack() {
  console.log("me")
  return (
    <div>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="forgotpassword" element={<ForgotPassword/>} />
        <Route path='resetpassword' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export function LoginRouteStack() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/eventpage/:id" element={<EventPage />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/hostevent" element={<HostEvent/>}/>
      </Routes>
    </div>
  );
}
