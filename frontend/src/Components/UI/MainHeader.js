import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStateContext } from "../Context";

import Navigation from "../LandingPages/Navigation";
import styles from "../UI/MainHeader.module.css";

const MainHeader = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  let navigate = useNavigate();
  function logoutHandler() {

    setIsLoggedIn(false);
    navigate('/');
  }
  return (
    <div style={styles}>
      {! isLoggedIn && (
        <header className={styles.mainheader}>
          <h1>Gigs 'N Chill</h1>
          <Navigation />
        </header>
      )}
      {isLoggedIn && (
        <header className={styles.mainheader}>
          <h1>Gigs 'N Chill</h1>
          <Navigation onLogout={logoutHandler}/>
        </header>
      )}
    </div>
  );
};

export default MainHeader;
