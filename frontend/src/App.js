import "./App.css";
import React, { useState, useEffect } from "react";
import { LoginStateContext } from "./Components/Context";
import { RouteStack, LoginRouteStack } from "./Components/Auth/RouteStack";
import MainHeader from "./Components/UI/Header/MainHeader";
import { useNavigate } from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") == "" ? false : true
  );
  const [userEmail, setUserEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var time = JSON.parse(localStorage.getItem("starttime"));
    if ((new Date() - new Date(time)) / 1000 > 3600) {
      localStorage.clear();
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div>
      <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <MainHeader />
        {console.log(isLoggedIn)}
        {!isLoggedIn ? RouteStack() : LoginRouteStack()}
      </LoginStateContext.Provider>
    </div>
  );
}

export default App;
