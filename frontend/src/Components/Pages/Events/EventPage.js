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
import events from "./EventData";

export default function EventPage(props) {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false); // setting bookmark

  useEffect(() => {
    setLoading(true);
    const eventId = events.filter((e) => e.eventid === parseInt(id))[0];
    console.log(eventId);
    setEvent(eventId);
    setLoading(false);
  }, []);

  function handleRegistration() {
    console.log("Making registration");
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
            image={bgimage}
            alt="event image"
          />
        </div>
        <CardContent className={styles.cardcontent}>
          <div className={styles.eventtitle}>
            <h3>{event.eventname}</h3>
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
            <div className={styles.eventdate}>
              <t>{event.date}</t>
            </div>
            {}
            <div className={styles.eventtype}>
              <h5>{event.eventgenre}</h5> <div> . </div>
              <h5>{event.eventtype}</h5>
            </div>
            <div className={styles.eventlocation}>
              <p>Address and location</p>
            </div>
            <div className={styles.eventtime}>
              <p>
                Time : {event.starttime} to {event.endtime}
              </p>
            </div>
          </div>
          <p>{event.eventdescription}</p>
          <div></div>
        </CardContent>
        <div className={styles.eventregister}>
          <div className={styles.eventseats}>
            <p>No. of Tickets left : Number</p>
          </div>
          <button type="button" onClick={handleRegistration}>
            Book Ticket
          </button>
        </div>
      </Card>
      </div>
    </div>
  );
}
