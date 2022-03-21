import React, { useContext } from "react";
import { LoginStateContext } from "../../Context";
import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@material-ui/core";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  const [show, setshow] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (event) => {
    
    props.onLogout(); // from mainheader
    setAnchorEl(null);
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setshow(true);
      } else setshow(false);
    });

    return () => {
      // window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div styles={styles}>
      <nav className={styles.nav}>
        {isLoggedIn && (
          <>
            <ul>
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <a href="/">Chat</a>
              </li>
              <li>
                <a href="/">Host a Event ?</a>
              </li>

              <li>
                <Avatar
                  //   img directory origins from robot.txt
                  className="usericon"
                  id="basic-avatar"
                  alt="harsha"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img
                    className={styles.dp}
                    src="https://www.cnet.com/a/img/CSTqzAl5wJ57HHyASLD-a0vS2O0=/940x528/2021/04/05/9e065d90-51f2-46c5-bd3a-416fd4983c1a/elantra-1080p.jpg"
                    alt="car"
                  />
                </Avatar>
              </li>
            </ul>
          </>
        )}
      </nav>

      <Menu
        className={styles.menuclass}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-avatar",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`profile`}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Navigation;
