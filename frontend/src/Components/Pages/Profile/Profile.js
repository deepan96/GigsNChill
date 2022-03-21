import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
//import "./Profile.css";
import MainHeader from '../../UI/Header/MainHeader';
import EventTile from "../Events/EventTile";
import styles from "./Profile.css";
import { NavLink } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ProIcon from '@mui/icons-material/AccountCircle';
import events from "../Events/EventData";
function Profile(props) {
    const[date,setDate] = useState(new Date());
    const loop = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div>
            <div className="page">
                <header>
                <IconButton aria-label="profile icon">
                    <ProIcon style={{ fontSize: 250 }}/>
                </IconButton>
                    {/* <div className="pic">
                        <p>+</p>
                    </div> */}
                    {/* <img src = {require("")}/> */}
                    <div className="Info">
                    <h3>Name: </h3>
                    <h3>Email: </h3>
                    <h3>Phone Number: </h3>
                    </div>
                    {/* <h2>Events</h2> */}
                    {/* <h2>Friends</h2> */}
                    
                </header>
                <body className="content">
                    <article className="cal-body">
                            {/* <h2>
                                Calendar
                            </h2> */}
                            <div className="cal">
                                 <h2 className="text-center"> Calendar</h2>
                                <div className="calendar-container">
                                    <Calendar onChange={setDate} value={date}/>
                                </div>
                                <p className="text-center">
                                    <span className="bold">
                                        Date:
                                    </span>
                                    {' '}
                                    {date.toDateString()}
                                </p>
                            </div>
                    </article>
                    <article className="hist-body">
                        <h2>
                            Event History
                        </h2>
                        <div className="events">
                        <div style={styles}>
                            <div>
                                {events.map((i)=><EventTile event={i}/>)}
                            </div>
                        </div>
                        </div>
                    </article>
                </body>
            </div>
        </div>
    );
}

export default Profile;