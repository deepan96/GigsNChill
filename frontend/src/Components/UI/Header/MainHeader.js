import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import Navigation from "../../Pages/Navigation/Navigation";
import styles from "./MainHeader.module.css";

const MainHeader = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  let navigate = useNavigate();

  function homelogoNavigate() {
    console.log("Navigate to Home");
    navigate('/home');
  }

  function coverlogoNavigate() {
    console.log("Navigate to Cover Page");
    navigate('/');
  }

  function logoutHandler() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  return (
    <div style={styles}>
      {! isLoggedIn && (
        <header className={styles.mainheader}>
          <div className={styles.logoclick} onClick={coverlogoNavigate}>
            </div>
          <Navigation />
        </header>
      )}
      {isLoggedIn && (
        <header className={styles.mainheader}>
          <div className={styles.logoclick} onClick={homelogoNavigate}>
          <></>
          </div>
          <Navigation onLogout={logoutHandler}/>
        </header>
      )}
    </div>
  );
};

export default MainHeader;
