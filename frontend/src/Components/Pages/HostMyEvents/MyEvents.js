import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./MyEvents.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function MyEvents() {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState("");
  const [fEvents, setFEvents] = useState([]);
  const [pEvents, setPEvents] = useState([]);
  const [hEvents, setHEvents] = useState([]);

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/viewprofile/${user_info.type.toLowerCase()}/${
        user_info.email
      }/`,
    };
    axios(config).then((res) => {
      console.log(res.data.data);
      setUserData(res.data.data);
      const p_events = res.data.data.PastEvents;
      const f_events = res.data.data.FutureEvents;
      setFEvents(f_events);
      setPEvents(p_events);
      //   console.log("Future", fEvents, pEvents);
      const ii = f_events.concat(p_events);
      setHEvents(ii);
      //   console.log("total", hEvents);
    });
  }, []);

  return (
    <div style={styles}>
      <div className={styles.container}>
        {hEvents &&
          hEvents.map((ud) => (
            <Card key={ud.EventId} className={styles.eventcard}>
              <div className={styles.imagediv}>
                <CardMedia
                  className={styles.cardimage}
                  image={ud.ImageUrl}
                  alt="event image"
                />
              </div>
              <CardContent className={styles.cardcontent}>
                <div className={styles.eventtitle}>
                  <h5>
                    <Link
                      className={styles.eventlink}
                      to={`/eventdetails/${ud.EventId}`}
                    >
                      {ud.EventName}
                    </Link>
                  </h5>
                </div>
                <p>{ud.EventDate}</p>
                <div>
                  <p>No. of Tickets Available: {ud.SeatsAvailable}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
