import React, { useState, useContext } from "react";
import styles from "./SignUp.module.css";
import passwordStrength from "../../PasswordChecker";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { Radio, Switch } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";
import { Alert } from "@mui/material";

const SignUp = (props) => {
  
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [switchOn, setSwitchOn] = useState(false);
    const [radioValue, setRadioValue] = useState("user");
    const [typeOfUser, setTypeofUser] = useState("user");
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
    function handleswitchtype() {
      setSwitchOn(!switchOn);
      const person = switchOn===true?'user':'host';
      setTypeofUser(person);
      console.log("person=true is user, else owner", person);
    }
    function submitHandler(event) {
        event.preventDefault();
        let flag = false;
        if(userEmail.includes("@") && passwordStrength(userPassword) && (userPassword.trim().length === userConfirmPassword.trim().length)) {
          console.log("login success")
          flag = true;
        }
        else {
          window.alert("check password criteria");
        }
        // props.onSuccess(true);
        if(flag) {
          setIsLoggedIn(true);
          navigate('/home');
        }
        setFormIsValid(!flag);
        setUserFirstName('');
        setUserLastName('');
        setUserEmail('');
        setUserPhoneNumber('');
        setUserPassword('');
        setUserConfirmPassword('');
    }
  return (
    <div style={styles}>
      <Card className={styles.signup}>
        <div className="heading" >
          <h4>Sign-Up here</h4>
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
          <Radio checked={radioValue === "user"} name="useradio" value="user" color="primary" onChange={()=> setRadioValue("user")} />
          <div >
              <label>Host</label>
            </div>
            <Radio checked={radioValue === "host"} name="hostradio" value="host" color="primary" onChange={()=> setRadioValue("host")}/>
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
            {!formIsValid && <NavLink to="/home"></NavLink>}
            <Button type="submit"className="button">Register</Button>
            {/*  disabled={!formIsValid}  <p onClick={changetoLogin}>Already a user? <span style={{color:'red'}}>Sign-In.</span></p> */}
            <p>Already a user? <NavLink to="/">Login</NavLink></p>
          </div>
        </form>
      </Card>
      </div>
  );
};

export default SignUp;
