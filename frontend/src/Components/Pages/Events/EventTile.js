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
import styles from "./EventTile.module.css";
import bgimage from "../../Pages/Promote-Your-local-event.jpg";
import { Link, Navigate } from "react-router-dom";
import { red } from "@material-ui/core/colors";

function EventTile(props) {
  const eventName = props.event.EventName;
  const res =
    props.event.EventDescription.slice(0, 20) +
    (props.event.EventDescription.length > 20 ? "..." : "");
  const eventDesc = res;
  const eventDate = props.event.EventDate;
  const [fav, setFav] = useState(true); // setting bookmark
  const [booked, setisBooked] = useState(false); // setting bookmark

  useEffect(() => {
    try {
      let bookedevent = props.bookmarks.some(item => item.EventId === props.event.EventId);
      setisBooked(bookedevent)
      console.log(bookedevent)
    }
    catch{
    }
  },[])
  // connection
  var axios = require("axios");
  var FormData = require("form-data");
  const user_info = JSON.parse(localStorage.getItem("user"));

  function eventHandler() {
    console.log("Event clicked");
  }
  function handleFav() {

    // making a bookmark
    var data = new FormData();
    data.append("UserId", user_info.email);
    data.append("EventId", props.event.EventId);
    data.append("BookmarkStatus", !booked);
    var config = {
      method: "post",
      url: "https://gigsnchill.herokuapp.com/bookmarkevent/",
      data: data,
    };

    axios(config)
      .then((res) => {
        console.log(res.data.data);
        if (booked){
          setisBooked(false)
        }
        else{
          setisBooked(true)
        }
      })
      .catch((err) => {
        alert("Invalid BookMark Request");
        console.log(err);
      });
  }

  return (
    <div style={styles}>
      <Card className={styles.eventcard}>
        <div>
          <CardMedia
            className={styles.cardimage}
            image={props.event.ImageUrl}
            alt="event image"
          />
        </div>
        <CardContent className={styles.cardcontent}>
          <div className={styles.eventtitle}>
            <h5>
              <Link
                className={styles.eventlink}
                to={`eventpage/${props.event.EventId}`}
              >
                {eventName}
              </Link>
            </h5>
          </div>
          <p>{eventDesc}</p>
          <p>{eventDate}</p>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            sx={{ color: red[500] }}
            onClick={handleFav}
          >
            {booked && <FavoriteIcon sx={{ color: "red" }} />}
            {!booked && <FavoriteIcon />}
          </IconButton>
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        </CardActions>
      </Card>
    </div>
  );
}

export default EventTile;
