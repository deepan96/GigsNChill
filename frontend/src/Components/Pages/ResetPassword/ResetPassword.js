import styles from "./ResetPassword.module.css";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import passwordStrength from "../../PasswordChecker";
import Button from "../../UI/Button/Button";
import CardWrap from "../../UI/CardWrap/CardWrap";
import { Alert } from "@mui/material";

// Intregrations
import axios from "axios";

function ResetPassword(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  // Error Handling
  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  // Type input fields
  function handleUserEmail(event) {
    setUserEmail(event.target.value);
  }
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  function handleUserConfirmPassword(event) {
    setUserConfirmPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    // Password strength check
    if(!passwordStrength(userPassword)) {
      setErrorFound(true);
      setErrorMessage("Password min. length of 7, incl special, alpha-numeric.");
      return;
    }

    // Initialize API request .... Using the update password endpoint
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('Email', userEmail);
    data.append('Password', userPassword);
    data.append('Authorization',  'Token xxxxxxxxxxxxxxxxxxx'); // Not implemented yet in the backend

    var config = {
      method: 'put',
      url: 'http://127.0.0.1:8000/resetpassword/',
      data : data
    };
    
    let flag = false;
    if(userEmail.includes("@") && passwordStrength(userPassword) && (userPassword.trim().length === userConfirmPassword.trim().length)) {
      axios(config)
      .then(response => {
        
        if(response.data.status === 'error') {
          console.log("Entered error");
          setErrorFound(true);
          setErrorMessage(response.data.message);
          return ;
        }
        else {
          console.log(response);
          setFormIsValid(!flag);
          alert("Password Updated")
          navigate("/home");
        }
        
  })
    .catch((err) => alert("Account does not exist"))
      console.log("login fail")
      flag = true;
    }
   
    setFormIsValid(flag);
    setUserEmail("")
    setUserPassword("");
    setUserConfirmPassword("");
  }
  return (
    <div style={styles}>
      <CardWrap className={styles.resetpassword}>
        <div className={styles.heading}>
          <h4>Reset Password</h4>
        </div>
        {errorFound && <Alert severity="error">{errorMessage}</Alert>}
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
        <form onSubmit={submitHandler}>
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
            {/* {!formIsValid && <NavLink to="/login"></NavLink>} */}
            <Button type="submit" className="button">
              Submit
            </Button>
          </div>
        </form>
      </CardWrap>
    </div>
  );
}

export default ResetPassword;
