import React, { useReducer, useState, useEffect, useContext } from "react";
import styles from "./SignUp.module.css";
import passwordStrength from "../PasswordChecker";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Switch } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../Context";

const SignUp = (props) => {
  
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [typeOfUser, setTypeofUser] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginStateContext);
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
      setTypeofUser(!typeOfUser);
      const person = typeOfUser===true?'user':'owner';

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
        <form onSubmit={submitHandler}>
        <div className={styles.switchcase}>
            <div >
              <label>User</label>
            </div>
          <Switch
            onChange={handleswitchtype}
            color="primary"
            name="status"
          />
          <div >
              <label>Owner</label>
            </div>
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
