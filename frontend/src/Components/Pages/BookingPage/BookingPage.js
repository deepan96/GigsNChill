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
import styles from "./BookingPage.module.css";
import bgimage from "../Promote-Your-local-event.jpg";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Alert } from "@mui/material";
import { red } from "@material-ui/core/colors";
import ModalPop from "../../ModalPop/ModalPop";

export default function BookingPage(props) {
  const { bid } = useParams();
  const [event, setEvent] = useState();
  const [eventData, setEventData] = useState([]);
  const [fav, setFav] = useState(false); // setting bookmark
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();

  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorSeverity, setErrorSeverity] = useState("error");

  const user_info = JSON.parse(localStorage.getItem("user"));

  var axios = require("axios");
  var config = {
    method: "get",
    url: `https://gigsnchill.herokuapp.com/bookinginfo/${bid}/`,
  };
  // getting events data

  useEffect(() => {
    axios(config).then((res) => {
      console.log(res.data.data);
      setEventData(res.data.data);
      const eventId = res.data.data;
      setEvent(eventId);
    });
  }, []);

  function handleFav() {
    setFav(!fav);
    console.log("like", fav);
    const user_info = JSON.parse(localStorage.getItem("user"));
    // making a bookmark
    var data = new FormData();
    data.append("UserId", user_info.email);
    data.append("EventId", bid);
    data.append("BookmarkStatus", fav);
    var config = {
      method: "post",
      url: "https://gigsnchill.herokuapp.com/bookmarkevent/",
      data: data,
    };

    axios(config)
      .then((res) => {
        console.log(res.data.data);
        alert("BookMark Success!");
      })
      .catch((err) => {
        alert("Invalid BookMark Request");
        console.log(err);
      });
  }

  function invokeShare() {
    setModelOpen(!modelOpen);
    console.log(modelOpen);
  }

  async function handleCancellation() {
    var config = {
      method: "get",
      url: `https://gigsnchill.herokuapp.com/cancelbooking/${parseInt(bid)}/`,
    };
    if (user_info.type === 'Host') {
        config.url = `https://gigsnchill.herokuapp.com/cancelevent/${parseInt(eventData.EventId)}/`;
    }
    
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
          setErrorMessage("Reservation Cancelled! :]");
          console.log("sucess");
          // navigate("/");
        }
        setTimeout(() => {
          setErrorFound(false);
          setErrorMessage("");
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        alert("Invalid Booking");
      });
  }

  return (
    <div style={styles}>
      <div className={styles.fullpage}>
        <Card className={styles.container}>
          {console.log(eventData)}
          <div className={styles.imagediv}>
            <CardMedia
              className={styles.cardimage}
              image={eventData.ImageUrl}
              alt="event image"
            />
          </div>
          <div className={styles.cardcontent}>
            <CardContent>
              <div className={styles.eventtitle}>
                <h3>{eventData.EventName}</h3>
                <div>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      sx={{ color: red[500] }}
                      onClick={handleFav}
                    >
                      {fav && <FavoriteIcon sx={{ color: "red" }} />}
                      {!fav && <FavoriteIcon />}
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon onClick={invokeShare} />
                    </IconButton>
                  </CardActions>
                  <ModalPop
                    eventid={bid}
                    invokefunc={invokeShare}
                    open={modelOpen}
                  />
                </div>
                <div className={styles.eventdetails}>
                  <div className={styles.eventdate}>
                    <p>{Date(eventData.EventDate)}</p>
                  </div>
                  <div className={styles.eventtime}>
                    <p>
                      Date and time : {eventData.EventStartTime} ,{" "}
                      {eventData.EventEndTime}
                    </p>
                  </div>
                  <div className={styles.eventtype}>
                    <h5>Category : {eventData.EventGenre}</h5>
                    <h5>Type : {eventData.EventType}</h5>
                  </div>
                  <div className={styles.eventlocation}>
                    <p>Address :</p>
                    {}
                    <p>
                      {eventData.Address},{eventData.ZipCode}
                    </p>
                  </div>
                  <div className={styles.eventtime}>
                    <p>
                      Date and time : {eventData.EventStartTime} ,{" "}
                      {eventData.EventEndTime}
                    </p>
                  </div>
                </div>
                <p>{eventData.EventDescription}</p>
              </div>
            </CardContent>

            <div className={styles.countbutton}>
              {errorFound && (
                <Alert severity={errorSeverity} cl>
                  {errorMessage}
                </Alert>
              )}
              <div className={styles.eventseats}>
                <p>No. of Tickets Booked : {eventData.NoOfSeats}</p>
              </div>
              <br></br>
            </div>
            <div className={styles.eventregister}>
              <button type="button" onClick={handleCancellation}>
                Cancel Reservation
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
