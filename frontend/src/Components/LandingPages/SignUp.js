import React, { useReducer, useState, useEffect } from "react";
import "./SignUp.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Switch } from "@material-ui/core";

const SignUp = (props) => {
  
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [typeOfUser, setTypeofUser] = useState(false);

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
        if(userEmail.includes("@") && (userPassword.trim().length > 6) && (userPassword.trim().length === userConfirmPassword.trim().length)) {
          console.log("login success")
          flag = true;
        }
        setFormIsValid(!flag);
        setUserFirstName('');
        setUserLastName('');
        setUserPassword('');
        setUserConfirmPassword('');
    }
    const changetoLogin = () => {
      props.makeRegisterOn(false);
    }
  return (
      <Card className="signup">
        <div >
          <h4>Sign-Up here</h4>
        </div>
        <form onSubmit={submitHandler}>
        <div className="switchcase">
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
          <div className="control">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              type="text"
              placeholder="First Name"
              value={userFirstName}
              onChange={handleUserFirstName}
            />
          </div>
          <div className="control">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              value={userLastName}
              onChange={handleUserLastName}
            />
          </div>
          <div className="control">
            <label htmlFor="useremail">Email</label>
            <input
              id="useremail"
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={handleUserEmail}
            />
          </div>
          <div className="control">
            <label htmlFor="userpassword">Password</label>
            <input
              id="userpassword"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <div className="control">
            <label htmlFor="userconfpassword">Confirm Password</label>
            <input
              id="userconfpassword"
              type="password"
              placeholder="Confirm Password"
              value={userConfirmPassword}
              onChange={handleUserConfirmPassword}
            />
          </div>
          <div className="actions">
            <Button type="submit"className="button" disabled={!formIsValid}>Register</Button>
            <p onClick={changetoLogin}>Already a user? <span style={{color:'red'}}>Sign-In.</span></p>
            {/* <p>Not a user? <a href="#">Sign-up.</a></p> */}
          </div>
        </form>
      </Card>
  );
};

export default SignUp;
