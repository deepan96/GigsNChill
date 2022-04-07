import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React, { useState } from "react";
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

  function eventHandler() {
    console.log("Event clicked");
  }
  function handleFav() {
    setFav(!fav);
    console.log("like", fav);
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
            {/* onClick=
            {() => {
              console.log("fav");
              setFav(!fav);
            }} */}
            {!fav && <FavoriteIcon sx={{ color: "red" }} />}
            {fav && <FavoriteIcon />}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default EventTile;
