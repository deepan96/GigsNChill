import styles from "./ResetPassword.module.css";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import passwordStrength from "../../PasswordChecker";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";

function ResetPassword(props) {
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  let navigate = useNavigate();
  function handleUserPassword(event) {
    setUserPassword(event.target.value);
  }
  function handleUserConfirmPassword(event) {
    setUserConfirmPassword(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();
    let flag = false;
    if (
      passwordStrength(userPassword) &&
      userPassword.trim().length === userConfirmPassword.trim().length
    ) {
      console.log("login success");
      flag = true;
    }
    if (flag) {
      navigate("/"); // navigating back to login screen
    }
    setFormIsValid(flag);
    setUserPassword("");
    setUserConfirmPassword("");
  }
  return (
    <div style={styles}>
      <Card className={styles.resetpassword}>
        <div className={styles.heading}>
          <h4>Reset Password</h4>
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
      </Card>
    </div>
  );
}

export default ResetPassword;
