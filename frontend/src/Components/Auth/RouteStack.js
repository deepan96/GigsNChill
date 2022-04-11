import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import LandingPage from "../Pages/Default_land_page/LandingPage";
import EventPage from "../Pages/Events/EventPage";
import Profile from "../Pages/Profile/Profile";
import HostEvent from "../Pages/HostEvent/HostEvent";
import Chat from "../Pages/Chat/Chat";
import Bookmark from "../Pages/Bookmark/Bookmark";

export function RouteStack() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
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
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/hostevent" element={<HostEvent/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/bookmark" element={<Bookmark/>}/>
        <Route path="/myevents" element={<Bookmark/>}/>
      </Routes>
    </div>
  );
}
