import React, { useContext, useEffect, useState } from "react";
import { Backdrop, Radio, Switch } from "@material-ui/core";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import { Alert } from "@mui/material";

// UI Imports
import styles from "./Login.module.css";
import CardWrap from "../../UI/CardWrap/CardWrap";
import PageButton from "../../UI/PageButton/Pagebutton";

// Intregrations
import axios from "axios";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";

const Login = (props) => {
  const clientNumber =
    "1045972817888-a3oc81j71v3e1tjbld5akh4hgup4hv8f.apps.googleusercontent.com";
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [typeOfUser, setTypeofUser] = useState("User");
  const [formIsValid, setFormIsValid] = useState(true);
  const [CaptchaToken, setCaptchaToken] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  let navigate = useNavigate();

  // error messages
  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // If user is already logged in send them to homepage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    console.log(data);
    if (data && data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/");
    }
  });

  // google auth
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    setIsLoggedIn(true);
    navigate("/");
  };

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  function handleReCAPTCHA(value) {
    setCaptchaToken(value)
    console.log('Captcha value:', value);
  }
  // Handles Submit Button
  function submitHandler(event) {
    event.preventDefault();
 
    // Check that Recaptcha is valid
    if(!CaptchaToken){
      setErrorFound(true);
      setErrorMessage("Invalid Captcha Verification");
      return;
    }

    // Username and Password are empty
    if (userName === "" && userPassword === "") {
      setErrorFound(true);
      setErrorMessage("Enter both fields");
      return;
    }

    // Check Username and Password meet requirements
    let flag = false;
    if (userName.includes("@") && userPassword.trim().length > 6) {
      flag = true;
    } else {
      setErrorFound(true);
      setErrorMessage("Incorrect fields");
      return;
    }

    // Create Axios API rrequest
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("Email", userName);
    data.append("Password", userPassword);
    data.append("Type", typeOfUser); // type of user

    var config = {
      method: "post",
      url: "https://gigsnchill.herokuapp.com/login/",
      data: data,
    };

    axios(config)
      .then((response) => {
        // console.log(response);
        if (response.data.status === "error") {
          console.log("Entered error");
          setErrorFound(true);
          setErrorMessage("Email doesn't exist");
          // setErrorMessage(response.data.message);
          return;
        } else {
          // console.log(response);
          setFormIsValid(!flag);
          setIsLoggedIn(true);
          const mdata = {
            fname: response.data.user_fname,
            email: userName,
            type: typeOfUser,
            isLoggedIn: true,
          };
          localStorage.setItem("user", JSON.stringify(mdata));
          localStorage.setItem('starttime', JSON.stringify(new Date()));
          setUserName("");
          setUserPassword("");
          navigate("/");
        }
      })
      .catch((err) => {
        alert("Invalid Login Credentials");
        console.log(err);
      });
  }
  // function handleswitchtype() {
  //   setSwitchOn(!switchOn);
  //   const person = switchOn === true ? "user" : "host";
  //   setTypeofUser(person);
  //   console.log("person=true is user, else owner", person);
  // }
  return (
    <div style={styles}>
      <CardWrap className={styles.login}>
        <div className={styles.heading}>
          <h4>User Login</h4>
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
          <div className={styles.googlediv}>
          <GoogleLogin
            clientId={clientNumber}
            buttonText="Continue with Google"
            onSuccess={onLoginSuccess}
            onFailure={() => {
              window.alert("invalid login with google");
            }}
            cookiePolicy={"single_host_origin"}
          />
          </div>
          <hr></hr>
          <div className={styles.control}>
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="email"
              placeholder="UserName"
              value={userName}
              onChange={handleUserName}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <ReCAPTCHA
            sitekey="6LeXhJcfAAAAADGDzNvDOonRbMO9Q5l9zGCGWLah"
            onChange={handleReCAPTCHA}
          />
          <div className={styles.actions}>
            <PageButton type="submit" className="btn" disabled={!formIsValid}>
              Log In
            </PageButton>
          </div>
          <div className={styles.bottom}>
            <p className={styles.forgotpassword}>
              <NavLink to="/forgotpassword">ForgotPassword</NavLink>
            </p>
            <div className={styles.hyperlink}>
              <p>
                <NavLink to="/signup">SignUp</NavLink>
              </p>
          </div>
          </div>
        </form>
      </CardWrap>
    </div>
  );
};

export default Login;