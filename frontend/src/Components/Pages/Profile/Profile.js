// import React, { useEffect, useState } from "react";
// import { Route, Routes } from 'react-router-dom';
// import { Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
// //import "./Profile.css";
// import MainHeader from "../../UI/MainHeader";
// //import Event from "../Events/EventTile";
// import EventHome from './EventHome';
// import EventPage from './EventPage';
// import styles from "./Profile.css";
// import { NavLink } from "react-router-dom";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import ProIcon from '@mui/icons-material/AccountCircle';

// function Profile(props) {
//     const userName = "Harsha Valeti";
//     const userEmail = "";
//     const phoneNumber = "";
//     const host = "";
//     const [date, setDate] = useState(new Date());
//     const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     const [searchQuery, setSearchQuery] = useState(''); // gets search key from searchField

//     useEffect(() => {
//         // do nothing
//     }, [searchQuery]);
//     return (
//         <div>
//             <MainHeader />
//             <div className="page">
//                 <header>
//                     <IconButton aria-label="profile icon">
//                         <ProIcon style={{ fontSize: 250 }} />
//                     </IconButton>
//                     {/* <div className="pic">
//                         <p>+</p>
//                     </div> */}
//                     {/* <img src = {require("")}/> */}
//                     <div className="Info">
//                         <h3>Name: {userName}</h3>
//                         <h3>Email: {userEmail}</h3>
//                         <h3>Phone Number: {phoneNumber}</h3>
//                     </div>
//                     {/* <h2>Events</h2> */}
//                     {/* <h2>Friends</h2> */}

//                 </header>
//                 <body className="content">
//                     <article className="cal-body">
//                         {/* <h2>
//                                 Calendar
//                             </h2> */}
//                         <div className="cal">
//                             <h2 className="text-center"> Calendar</h2>
//                             <div className="calendar-container">
//                                 <Calendar onChange={setDate} value={date} />
//                             </div>
//                             <p className="text-center">
//                                 <span className="bold">
//                                     Date:
//                                 </span>
//                                 {' '}
//                                 {date.toDateString()}
//                             </p>
//                         </div>
//                     </article>
//                     <article className="hist-body">
//                         <h2>
//                             Event History
//                         </h2>
//                         <div className="events">
//                             <EventHome searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//                             <Routes>
//                                 <Route path='eventpage/:id' element={<EventPage />} />
//                             </Routes>
                            
//                         </div>
//                     </article>
//                 </body>
//             </div>
//         </div>
//     );
// }

// export default Profile;