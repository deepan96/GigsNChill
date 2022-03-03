import styles from "./ForgotPassword.module.css";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false);
  let navigate = useNavigate();
  function changeUserEmail(event) {
    setUserEmail(event.target.value);
  }
  function handleUser(event) {
    event.preventDefault();
    // check user Email in DB
    navigate('/resetpassword');
  }
  return (
    <div style={styles}>
      <Card className={styles.forgotpwsrd}>
         <form onSubmit={handleUser}>
            <div className={styles.heading}>
              <label>User Email</label>
            </div>
            <div className={styles.control}>
              <input
                type="email"
                value={userEmail}
                placeholder="Email"
                onChange={changeUserEmail}
              />
            </div>
            <div className={styles.actions}>
              <Button type="submit">Submit</Button>
            </div>
          </form>        
      </Card>
    </div>
  );
}

export default ForgotPassword;
