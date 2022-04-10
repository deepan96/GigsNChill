import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React, { useEffect, useState } from "react";
import styles from "./EventPage.module.css";
import bgimage from "../Promote-Your-local-event.jpg";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Alert } from "@mui/material";

export default function EventPage(props) {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false); // setting bookmark
  const [noftickets, setNoftickets] = useState(1);

  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorSeverity, setErrorSeverity] = useState("error");
  const [successVar, setSuccessvar] = useState(false);

  const user_info = JSON.parse(localStorage.getItem('user'));

  var axios = require("axios");
  var config = {
    method: "get",
    url: "http://127.0.0.1:8000/searchevent/",
  };
  // getting events data

  useEffect(() => {
    setLoading(true);

    axios(config).then((res) => {
      console.log(res.data.data);
      setEventData(res.data.data);

      console.log(eventData);
      const eventId = res.data.data.filter(
        (e) => e.EventId === parseInt(id)
      )[0];
      console.log(eventId);
      setEvent(eventId);
      setLoading(false);
    });
    setNoftickets(1);
    // setErrorFound(false);
    // setErrorMessage("");
  }, [successVar]);

  async function countPlus() {
    await setNoftickets((prev) => prev - 1);
    countCheck();
    // const tickets = 1;
    // tickets = (await tickets) > 0 ? tickets: 1;
    // setNoftickets(tickets);
    // console.log(tickets);
  }
  async function countMinus() {
    await setNoftickets((prev) => prev - 1);
    countCheck();
    // const tickets = 1;
    // tickets = (await tickets) > 6 ? 6 : tickets;
    // setNoftickets(tickets);
    // console.log(tickets);
  }
  async function countCheck() {
    const tickets = noftickets;
    setNoftickets((await tickets) > 0 ? (tickets > 6 ? 6 : tickets) : 1);

    console.log(tickets);
  }
  async function handleRegistration() {
    console.log("Making registration");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("UserId", user_info.email);
    data.append("NoOfSeats", noftickets);
    data.append("EventId", id);
    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/bookevent/",
      data: data,
    };
    axios(config)
      .then((res) => {
        if (res.data.status === "error") {
          console.log(res);
          console.log("error");
          setErrorFound(true);
          setErrorMessage(res.data.message);
          console.log(errorMessage);
        } else {
          setErrorSeverity("success");
          setErrorFound(true);
          setErrorMessage("Successfully booked! :]");
          console.log("sucess");
          setSuccessvar(prev=> !prev);
          
        }
        setTimeout(()=>{setErrorFound(false);setErrorMessage("")},3000);
      })
      .catch((err) => {
        alert("Invalid Booking");
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles}>
      <div className={styles.fullpage}>
        <Card className={styles.container}>
          <div>
            <CardMedia
              className={styles.cardimage}
              image={event.ImageUrl}
              alt="event image"
            />
          </div>
          <CardContent className={styles.cardcontent}>
            <div className={styles.eventtitle}>
              <h3>{event.EventName}</h3>
              <div>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      console.log("fav");
                      setFav(!fav);
                    }}
                  >
                    <FavoriteIcon color={fav ? "primary" : ""} />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </div>
              <div className={styles.EventDate}>
                <t>{event.date}</t>
              </div>
              {}
              <div className={styles.eventtype}>
                <h5>{event.EventGenre}</h5> <div> . </div>
                <h5>{event.EventType}</h5>
              </div>
              <div className={styles.eventlocation}>
                <p>Address :</p>
                {}
                <p>
                  {event.Address},{event.ZipCode}
                </p>
              </div>
              <div className={styles.eventtime}>
                <p>
                  Time : {event.EventStartTime} to {event.EventEndTime}
                </p>
              </div>
            </div>
            <p>{event.EventDescription}</p>
            <div></div>
          </CardContent>
          <div className={styles.countbutton}>
            {errorFound && (
              <Alert severity={errorSeverity}cl>{errorMessage}</Alert>
            )}
            <div className={styles.eventseats}>
              <p>No. of Tickets left : {event.SeatsAvailable}</p>
            </div>
            <br></br>
            <div className={styles.countplus}>
              <IconButton onClick={() => setNoftickets((prev) => prev - 1)}>
                <RemoveIcon />
              </IconButton>

              <div style={{ margin: "1em" }}>{noftickets}</div>

              <IconButton onClick={() => setNoftickets((prev) => prev + 1)}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <div className={styles.eventregister}>
            <button type="button" onClick={handleRegistration}>
              Book Ticket
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
