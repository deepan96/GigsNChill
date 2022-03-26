import "./App.css";
import React, { useState, useEffect } from "react";
import { LoginStateContext} from "./Components/Context";
import { RouteStack, LoginRouteStack } from "./Components/Auth/RouteStack";
import MainHeader from "./Components/UI/Header/MainHeader";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
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
