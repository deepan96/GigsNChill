import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import CardWrap from "../../UI/CardWrap/CardWrap";
import Button from "../../UI/Button/Button";
import { Backdrop, Radio, Switch } from "@material-ui/core";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import GoogleLogin from "react-google-login";
import { Alert } from "@mui/material";

// Intregrations
import axios from "axios";

const Login = (props) => {
  const clientNumber =
    "1045972817888-a3oc81j71v3e1tjbld5akh4hgup4hv8f.apps.googleusercontent.com";
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const [radioValue, setRadioValue] = useState("user");
  const [typeOfUser, setTypeofUser] = useState("User");
  const [formIsValid, setFormIsValid] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
  let navigate = useNavigate();
  //error messages
  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // google auth
  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    setIsLoggedIn(true);
    navigate("/home");
  };
  
  

  function handleUserName(event) {
    setUserName(event.target.value);
  }
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  // function radioHandler(event) {
  //   setRadioValue(event.target.value);
  //   console.log("from radio",radioValue);
  // }

  // Handles Submit Button
  function submitHandler(event) {
    event.preventDefault();

    // Username and Password are empty
    if (userName === "" && userPassword === "") {
        //setting error
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
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('Email', userName);
    data.append('Password', userPassword);
    data.append('Type', typeOfUser); // type of user
    data.append('Authorization',  'Token xxxxxxxxxxxxxxxxxxx'); // Not implemented yet in the backend

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/login/',
      data : data
    };

    axios(config)
    .then(response => {
        console.log(response);
        if(response.data.status === 'error') {
          console.log("Entered error");
          setErrorFound(true);
          setErrorMessage("Email doesn't exist");
          // setErrorMessage(response.data.message);
          return ;
        }
        else {
          console.log(response);
        setFormIsValid(!flag);
        setIsLoggedIn(true);
        setUserName("");
        setUserPassword("");
        navigate("/home");
        }
        
      })
    .catch((err) => {
      alert("Invalid Login Credentials")
                console.log(err)})
        
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
          <Radio checked={typeOfUser === "User"} name="useradio" value="User" color="primary" onChange={()=> setTypeofUser("User")} />
          <div >
              <label>Host</label>
            </div>
            <Radio checked={typeOfUser === "Host"} name="hostradio" value="Host" color="primary" onChange={()=> setTypeofUser("Host")}/>
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