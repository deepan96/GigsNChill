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

import Chat from "../Pages/Chat/Chat";
import Bookmark from "../Pages/Bookmark/Bookmark";
import BookingPage from "../Pages/BookingPage/BookingPage";
import MyEvents from "../Pages/HostMyEvents/MyEvents";
import EventDetails from "../Pages/EventDetails/EventDetails";
import EventHostPage from "../Pages/EventHostPage/EventHostPage";
export function RouteStack() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export function LoginRouteStack() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/eventpage/:id" element={<EventPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hostevent" element={<HostEvent />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/eventdetails/:id" element={<EventDetails />} />
        <Route path="/booking/:bid" element={<BookingPage />} />
        <Route path="/hostedeventdetails/:id" element={<EventHostPage />} />
      </Routes>
    </div>
  );
}
