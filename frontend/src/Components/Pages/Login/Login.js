import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import CardWrap from "../../UI/CardWrap/CardWrap";
import Button from "../../UI/Button/Button";
import { Backdrop, Radio, Switch } from "@material-ui/core";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import GoogleLogin from "react-google-login";
import { Alert } from "@mui/material";

const Login = (props) => {
  const clientNumber =
    "1045972817888-a3oc81j71v3e1tjbld5akh4hgup4hv8f.apps.googleusercontent.com";
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [typeOfUser, setTypeofUser] = useState("user");
  const [formIsValid, setFormIsValid] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  let navigate = useNavigate();
  //error messages
  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // google auth
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
  };
  

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();
    if (userName === "" && userPassword === "") {
      console.log("Im here");
      //setting error
      setErrorFound(true);
      setErrorMessage("Enter both fields");
      return;
    }
    let flag = false;
    if (userName.includes("@") && userPassword.trim().length > 6) {
      console.log("login success");
      flag = true;
    } else {
      setErrorFound(true);
      setErrorMessage("Incorrect fields");
    }
    setFormIsValid(!flag);
    setIsLoggedIn(flag);
    setUserName("");
    setUserPassword("");
    navigate("/home");
  }
  return (
    <div style={styles}>
      <CardWrap className={styles.login}>
        <div className="heading">
          <h4>User Login</h4>
        </div>
        {errorFound && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={submitHandler}>
        <div className={styles.tagline}>
          <p>Choose who you're.</p>
          </div>
          <div className={styles.switchcase}>
            <div >
              <label>User</label>
            </div>
          <Radio checked={typeOfUser === "user"} name="useradio" value="user" color="primary" onChange={()=> setTypeofUser("user")} />
          <div >
              <label>Host</label>
            </div>
            <Radio checked={typeOfUser === "host"} name="hostradio" value="host" color="primary" onChange={()=> setTypeofUser("host")}/>
          </div>
      
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
          <div className={styles.actions}>
            <Button type="submit" className="btn" disabled={!formIsValid}>
              Log In
            </Button>
          </div>
          <p className={styles.forgotpassword}>
            <NavLink to="/forgotpassword">ForgotPassword?</NavLink>
          </p>
          <div className={styles.hyperlink}>
            <p>
              Not a user? <NavLink to="/signup">SignUp</NavLink>
            </p>
          </div>
        </form>

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
      </CardWrap>
    </div>
  );
};

export default Login;
