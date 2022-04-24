import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EventDetails.module.css";
import moment from "moment";

export default function EventDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);

  const user_info = JSON.parse(localStorage.getItem("user"));

  var axios = require("axios");
  var config = {
    method: "get",
    url: "https://gigsnchill.herokuapp.com/searchevent/",
  };
  // getting events data

  useEffect(() => {
    axios(config).then((res) => {
      console.log(res.data.data);
      setEventDetails(res.data.data);

      console.log(eventDetails);
      const eventId = res.data.data.filter(
        (e) => e.EventId === parseInt(id)
      )[0];
      console.log(eventId);
      setEventDetails(eventId);
      var config = {
        method: "get",
        url: `https://gigsnchill.herokuapp.com/eventattendees/${eventId.EventId}/`,
      };

      axios(config)
        .then((res) => {
          //   userDetails(res);
          console.log(res.data.data);
          setUserDetails(res.data.data);
        })
        .catch((err) => alert("Enter Proper Event details"));
    });
  }, []);

  return (
    <div style={styles}>
      <div className={styles.whole}>
        <Card className={styles.container}>
          <div className={styles.imagediv}>
            <CardMedia
              className={styles.cardimage}
              image={eventDetails.ImageUrl}
              alt="event image"
            />
          </div>
          <div className={styles.cardcontent}>
            <CardContent>
              <div className={styles.eventtitle}>
                <h3>{eventDetails.EventName}</h3>
                <div className={styles.eventdetails}>
                  <div className={styles.eventdate}>
                    <p>
                      {moment(eventDetails.EventDate).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <div className={styles.eventtime}>
                    <p>
                      Time : {eventDetails.EventStartTime} --{" "}
                      {eventDetails.EventEndTime}
                    </p>
                  </div>
                  <div className={styles.eventtype}>
                    <h5>Category : {eventDetails.EventGenre}</h5>
                    <h5>Type : {eventDetails.EventType}</h5>
                  </div>
                  <div className={styles.eventlocation}>
                    <p>Address :</p>
                    {}
                    <p>
                      {eventDetails.Address},{eventDetails.ZipCode}
                    </p>
                  </div>
                  <div className={styles.eventtime}>
                    <p>
                      Date and time : {eventDetails.EventStartTime} --{" "}
                      {eventDetails.EventEndTime}
                    </p>
                  </div>
                </div>
                <label>User registered:</label>
                <div className={styles.userinfo}>
                  {userDetails.map((ud) => (
                    <p>User Name : {ud}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
