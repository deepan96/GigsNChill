import styles from "./ForgotPassword.module.css";
import CardWrap from "../../UI/CardWrap/CardWrap";
import Button from "../../UI/Button/Button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStateContext } from "../../Context";

// Intregrations
import axios from "axios";

function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginStateContext);

  let navigate = useNavigate();

  function changeUserEmail(event) {
    setUserEmail(event.target.value);
  }

  function handleUser(event) {
    event.preventDefault();

    // Initialize API request .... Using the recover password endpoint
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('Email', userEmail);

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/recoverpassword/',
      data : data
    };

    // Send email to DB, user will get email with next steps
    axios(config)
      .then(response => {
          console.log(response);
          alert("Password Reset Link Sent")
          navigate("/home");        
      })
    .catch((err) => alert("Account does not exist"))
    }
  
  return (
    <div style={styles}>
      <CardWrap className={styles.forgotpwsrd}>
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
      </CardWrap>
    </div>
  );
}

export default ForgotPassword;
