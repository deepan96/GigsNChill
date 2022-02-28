import React, { useContext } from "react";
import { LoginStateContext } from "../Context";
import NavBar from "../UI/NavBar";

import styles from "./Navigation.module.css";

const Navigation = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  return (
    <div styles={styles}>
      <nav className={styles.nav}>
        {isLoggedIn && (
          <ul>
            {/* <li>
              <a href="/">Users</a>
            </li> */}

            <li>
              <a href="/">Host a Event ?</a>
            </li>

            <li>
              {/* <button onClick={props.onLogout}>Logout</button> */}
              <NavBar />
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
