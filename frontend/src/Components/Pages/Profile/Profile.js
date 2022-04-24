import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import styles from "./Profile.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BigCalendar from "react-big-calendar";
import CardWrap from "../../UI/CardWrap/CardWrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import bgimage from "../../Pages/Promote-Your-local-event.jpg";
import { Link, Navigate } from "react-router-dom";
import { red } from "@material-ui/core/colors";

function Profile(props) {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState("");
  const [fEvents, setFEvents] = useState([]);
  const [pEvents, setPEvents] = useState([]);

  var axios = require("axios");
  // var FormData = require("form-data");
  // var data = new FormData();
  // data.append()
  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/viewprofile/${user_info.type.toLowerCase()}/${
        user_info.email
      }/`,
    };
    var fe = [];
    axios(config).then((res) => {
      console.log(res.data.data);
      const uad = res.data.data;
      fe = res.data.data.FutureEvents;
      setUserData(res.data.data);
      console.log("future", res.data.data.FutureEvents);
      setFEvents(res.data.data.FutureEvents);
      setPEvents(res.data.data.PastEvents);
      // console.log(fEvents);
      // console.log(fe);
    });
  }, []);

  return (
    <div style={styles}>
      <CardWrap>
        <div className={styles.container}>
          <div className={styles.userdiv}>
            <h5>UserName: {userData.Email}</h5>
            <h5>FirstName: {userData.FirstName}</h5>
            <h5>UserName: {userData.LastName}</h5>
          </div>

          <div className={styles.usercalendar}>
            <p className={styles.datediv}>
              <Calendar onChange={setDate} value={date} />
              <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
              {date.toDateString()}
            </p>
          </div>
          <div className={styles.heading}>
            <h3>Upcoming Events</h3>
          </div>
          <div className={styles.userupcoming}>
            <div className={styles.subcontainer}>
              {fEvents &&
                fEvents.map((ud) => (
                  <Card className={styles.eventcard}>
                    {console.log(ud)}
                    <div>
                      <CardMedia
                        className={styles.cardimage}
                        image={ud.ImageUrl}
                        alt="event image"
                      />
                    </div>
                    <CardContent className={styles.cardcontent}>
                      <div className={styles.eventtitle}>
                        <h5>
                          {user_info.type === "User" && (
                            <Link
                              className={styles.eventlink}
                              to={`/booking/${ud.BookingId}`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                          {user_info.type === "Host" && (
                            <Link
                              className={styles.eventlink}
                              to={`/eventdetails`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                        </h5>
                      </div>
                      <p>{ud.EventDate}</p>
                      <div>
                        <p>No. of Tickets Available: {ud.SeatsAvailable}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {!fEvents && (
                <div>No Events to Display. Reserve for a Event now!</div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            <h3>Past Events</h3>
          </div>
          <div className={styles.userupcoming}>
            <div className={styles.subcontainer}>
              {pEvents &&
                pEvents.map((ud) => (
                  <Card className={styles.eventcard}>
                    <div>
                      <CardMedia
                        className={styles.cardimage}
                        image={ud.ImageUrl}
                        alt="event image"
                      />
                    </div>
                    <CardContent className={styles.cardcontent}>
                      <div className={styles.eventtitle}>
                      <h5>
                          {user_info.type === "User" && (
                            <Link
                              className={styles.eventlink}
                              to={`/booking/${ud.BookingId}`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                          {user_info.type === "Host" && (
                            <Link
                              className={styles.eventlink}
                              to={`/eventdetails`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                        </h5>
                      </div>
                      <p>{ud.EventDate}</p>
                      <div>
                        <p>No. of Tickets Available: {ud.SeatsAvailable}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {!fEvents && <div>No Events to Display.</div>}
            </div>
          </div>
        </div>
      </CardWrap>
    </div>
  );
}

export default Profile;
