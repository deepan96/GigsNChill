import React, {useContext, useState} from "react";
import styles from "./Login.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { Switch } from "@material-ui/core";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { LoginStateContext } from "../Context";
import GoogleLogin from "react-google-login";

const Login = (props) => {
    const clientNumber = "1045972817888-a3oc81j71v3e1tjbld5akh4hgup4hv8f.apps.googleusercontent.com";
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [typeOfUser, setTypeofUser] = useState(false);
    const [formIsValid, setFormIsValid] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginStateContext);
    let navigate = useNavigate();

    const onLoginSuccess = (res) => {
      console.log('Login Success:', res.profileObj);
    }

    function handleUserName(event) {
        setUserName(event.target.value);
    }
    function handleUserPassword(event) {
        setUserPassword(event.target.value);
    }
    // turning on Signup component invoking
    function handleRegister(event) {
      props.makeRegisterOn(true);
    }
    function submitHandler(event) {
        event.preventDefault();
        if (userName === '' && userPassword === '') {
          //setting error
        }
        let flag = false;
        if(userName.includes("@") && userPassword.trim().length > 6) {
          console.log("login success")
          flag = true;
        }
        setFormIsValid(!flag);
        setIsLoggedIn(flag);
        setUserName('');
        setUserPassword('');
        navigate('/home');
    }
    function handleswitchtype() {
      setTypeofUser(!typeOfUser);
      const person = typeOfUser===true?'user':'owner';
      
      console.log("person=true is user, else owner", person);
    }
  return (
    
    <div style = {styles}>
      <Card className={styles.login}>
        <div className="heading">
          <h4>User Login</h4>
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
            <Button type="submit" className='btn' disabled={!formIsValid}>Submit</Button>
            
          </div>
          <p className={styles.forgotpassword}>
            
              <NavLink to="/forgotpassword">ForgotPassword?</NavLink>
            </p>
          <div className={styles.hyperlink}>
            <p>Not a user? <NavLink to="/signup">SignUp</NavLink></p>
          </div>
        </form>
        <GoogleLogin
        clientId={clientNumber}
        buttonText="Google Login"
        onSuccess={onLoginSuccess}
        onFailure={()=>{window.alert("invalid login with google")}}
        cookiePolicy={'single_host_origin'}
  />
      </Card>
      </div>
  );
};

export default Login;
