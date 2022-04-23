import React from "react";
import logo from  "../Vector_White.png"
import videobg from "../vidbg.mp4"
import Button from "../../UI/Button/Button";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage(props) {
  return (
      <div className="coverbg">

        {/* If switching to image bg comment out, and switch css in coverbg class */}
        <video autoplay = "autoplay" muted loop id="myVideo">
          <source src= {videobg} type="video/mp4"/>
        </video>

        <div className="main-content">
          <img src={logo} className="main-content logo" alt="NULL"/>      
    
          <div className="main-content buttons">   
            <Link to="/login">
              <Button type="submit" className="btn">
                Log In
              </Button>
            </Link>

            <Link to="/signup">
              <Button type="submit" className="btn">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>        
      </div>
  );
}

export default LandingPage;
