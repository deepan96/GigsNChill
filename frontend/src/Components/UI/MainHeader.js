import React, { useContext } from "react";
import { LoginStateContext } from "../Context";

import Navigation from "../LandingPages/Navigation";
import "../UI/MainHeader.css";

const MainHeader = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  return (
    <div>
      {! isLoggedIn && (
        <header className="main-header">
          <h1>Gigs 'N Chill</h1>
          <Navigation />
        </header>
      )}
      {isLoggedIn && (
        <header className="main-header">
          <h1>Gigs 'N Chill</h1>
          <Navigation onLogout={()=> setIsLoggedIn(false)}/>
        </header>
      )}
    </div>
  );
};

export default MainHeader;
