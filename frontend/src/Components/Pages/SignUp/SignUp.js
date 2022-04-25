import React, { useState, useContext } from "react";
import passwordStrength from "../../PasswordChecker";

import { Radio, Switch } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import { Alert } from "@mui/material";
import axios from "axios";
import { createUser } from "../Chat/ChatUserCreate";

// UI Imports
import styles from "./SignUp.module.css";
import CardWrap from "../../UI/CardWrap/CardWrap";
import PageButton from "../../UI/PageButton/Pagebutton";

const SignUp = (props) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  // const [switchOn, setSwitchOn] = useState(false);
  const [typeOfUser, setTypeofUser] = useState("User");
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(true);

  function handleUserFirstName(event) {
    setUserFirstName(event.target.value);
  }
  function handleUserLastName(event) {
    setUserLastName(event.target.value);
  }
  function handleUserEmail(event) {
    setUserEmail(event.target.value);
  }
  function handleUserPhone(event) {
    setUserPhoneNumber(event.target.value);
  }
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  function handleUserConfirmPassword(event) {
    setUserConfirmPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("Type", typeOfUser);
    data.append("FirstName", userFirstName);
    data.append("LastName", userLastName);
    data.append("Email", userEmail);
    data.append("Mobile", userPhoneNumber);
    data.append("Password1", userPassword);
    data.append("Password2", userConfirmPassword);

    var config = {
      method: "post",
      url: "https://gigsnchill.herokuapp.com/register/",
      data: data,
    };
    let flag = false;
    if (userEmail === "" && userPassword === "" && userConfirmPassword === "") {
      setErrorFound(true);
      setErrorMessage("Empty fields");
      return;
    }
    if (!passwordStrength(userPassword)) {
      setErrorFound(true);
      setErrorMessage(
        "Password min. length of 7, incl special, alpha-numeric."
      );
      return;
    }
    if (
      userEmail.includes("@") &&
      passwordStrength(userPassword) &&
      userPassword.trim().length === userConfirmPassword.trim().length
    ) {
      axios(config)
        .then((response) => {
          if (response.data.status === "error") {
            console.log("Entered error");
            setErrorFound(true);
            setErrorMessage(response.data.message);
            return;
          } else {
            console.log(response);
            setFormIsValid(!flag);
            setIsLoggedIn(true);
            const mdata = {
              fname: userFirstName,
              email: userEmail,
              type: typeOfUser,
              isLoggedIn: true,
            };
            localStorage.setItem("user", JSON.stringify(mdata));

            localStorage.setItem("starttime", JSON.stringify(new Date()));
            // creating users for Chat
            createUser({ username: userFirstName, secret: "ABCabc123@" });

            navigate("/");
          }
        })
        .catch((err) => alert("Account does not exist"));
      console.log("login success");
      flag = true;
    }

    // props.onSuccess(true);
    // if(flag) {
    //   setIsLoggedIn(true);
    //   navigate('/home');
    // }
    // setFormIsValid(!flag);
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    setUserPhoneNumber("");
    setUserPassword("");
    setUserConfirmPassword("");
  }
  return (
    <div style={styles}>
      <CardWrap className={styles.signup}>
        <div className={styles.heading}>
          <h4>Sign-Up</h4>
        </div>
        {errorFound && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={submitHandler}>
          <div className={styles.tagline}>
            <p>Choose who you are:</p>
          </div>
          <div className={styles.switchcase}>
            <div>
              <label>User</label>
            </div>
            <Radio
              checked={typeOfUser === "User"}
              name="useradio"
              value="User"
              color="primary"
              onChange={() => setTypeofUser("User")}
            />
            <div>
              <label>Host</label>
            </div>
            <Radio
              checked={typeOfUser === "Host"}
              name="hostradio"
              value="Host"
              color="primary"
              onChange={() => setTypeofUser("Host")}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              placeholder="First Name"
              value={userFirstName}
              onChange={handleUserFirstName}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              value={userLastName}
              onChange={handleUserLastName}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="useremail">Email</label>
            <input
              id="useremail"
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={handleUserEmail}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="phonenumber">Phone</label>
            <input
              id="phonenumber"
              type="tel"
              placeholder="1234567890"
              value={userPhoneNumber}
              onChange={handleUserPhone}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="userpassword">Password</label>
            <input
              id="userpassword"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="userconfpassword">Confirm Password</label>
            <input
              id="userconfpassword"
              type="password"
              placeholder="Confirm Password"
              value={userConfirmPassword}
              onChange={handleUserConfirmPassword}
            />
          </div>
          <div className={styles.actions}>
            {!isLoggedIn && <NavLink to="/home"></NavLink>}
            <PageButton type="submit" className="btn">
              Register
            </PageButton>
            <p>
              Already a user? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </form>
      </CardWrap>
    </div>
  );
};

export default SignUp;
