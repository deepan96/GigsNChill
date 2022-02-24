import React, { useState } from "react";
import "./LandingPage.css";
import MainHeader from "../UI/MainHeader";
import Card from "../UI/Card"
import { NavLink } from "react-router-dom";

function LandingPage(props) {
  const [activeRegister, setActiveRegister] = useState(false);
  const turnRegister = (state) => {
    setActiveRegister(state);
  };
  return (
    <div>
      <MainHeader />
      <div className="land-container">
        <div className="land-split left">
          <p></p>
        </div>
        <Card className="land-split right">
          <div>
            <p>
              <NavLink to="/login">Login?</NavLink>
            </p>
            <p>
              <span> OR </span>
            </p>
            <p>
              <NavLink to="/signup">SignUp</NavLink>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LandingPage;
