import React, {useState} from "react";
import "./Login.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Switch } from "@material-ui/core";

const Login = (props) => {
  
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [typeOfUser, setTypeofUser] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    function handleUserName(event) {
      console.log(event.target.value);
        setUserName(event.target.value);
    }
    function handleUserPassword(event) {
      console.log(event.target.value)
        setUserPassword(event.target.value);
    }
    // turning on Signup component invoking
    function handleRegister(event) {
      props.makeRegisterOn(true);
    }
    function submitHandler(event) {
        event.preventDefault();
        let flag = false;
        if(userName.includes("@") && userPassword.trim().length > 6) {
          console.log("login success")
          flag = true;
        }
        setFormIsValid(!flag);
        setUserName('');
        setUserPassword('');
    }
    function handleswitchtype() {
      setTypeofUser(!typeOfUser);
      const person = typeOfUser===true?'user':'owner';
      
      console.log("person=true is user, else owner", person);
    }
    // function clickingon(event){
    //   console.log("entered clicke")
    //   props.makeRegisterOn(true);
    // }
  return (
    
      <Card className='login'>
        <div >
          <h4>User Login</h4>
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
          <div className='control'>
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="email"
              placeholder="UserName"
              value={userName}
              onChange={handleUserName}
            />
          </div>

          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <div className='action'>
            <Button type="submit" className='btn' disabled={!formIsValid}>Submit</Button>
            
          </div>
          <div className="hyperlink">
            <p onClick={handleRegister}>Not a user?<span style={{color:'red'}}> Sign-up.</span></p>
          </div>
        </form>
        {/* <Button type='button' onClick={clickingon}>Register</Button> */}
      </Card>
  );
};

export default Login;
