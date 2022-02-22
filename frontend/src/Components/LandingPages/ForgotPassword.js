import styles from './ForgotPassword.module.css';
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState } from "react";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false);
    function changeUserEmail(event) {
        setUserEmail(event.target.value);
    }
  function handleUser(event) {
      event.preventDefault();
        // check user Email in DB
        setAcknowledgement(true);
  }
  return (
    <div style={styles}>
    <Card className={styles.forgotpwsrd}>
      <form onSubmit={handleUser}>
        <div className="heading">
          <label>User Email</label>
        </div>
        <div className="control">
            <input type="email" value={userEmail} placeholder="Email" onChange={changeUserEmail}/>
        </div>
        <div className="actions">
            <Button type="submit">Submit</Button>
        </div>
      </form>

      
    </Card>
    </div>
  );
}

export default ForgotPassword;
