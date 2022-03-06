import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import LandingPage from "../Pages/Default_land_page/LandingPage";
import EventPage from "../Pages/Events/EventPage";

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
        <Route path="/*" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/eventpage/:id" element={<EventPage />} />
      </Routes>
    </div>
  );
}
