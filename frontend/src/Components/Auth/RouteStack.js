import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../LandingPages/Home';
import LandingPage from '../LandingPages/LandingPage';

export function RouteStack() {

    return (
        <div>
        <Routes>
        <Route path="/*" element={<LandingPage/>} />
        </Routes>
        </div>
    )
};

export function LoginRouteStack() {
    return (
        <div>
        <Routes>
        <Route path="/*" element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />

        </Routes>
        </div>
    )
};