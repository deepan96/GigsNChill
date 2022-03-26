import { Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from 'react';
import styles from './EventTile.module.css';
import bgimage from "../../Pages/Promote-Your-local-event.jpg"
import { Link, Navigate } from 'react-router-dom';


function EventTile(props) {

  const eventName = props.event.eventname;
  const eventDesc = props.event.eventdescription;
  const eventDate= props.event.date;
  const [fav, setFav] = useState(false); // setting bookmark


  function eventHandler() {
    console.log("Event clicked");
    
  }
  return (
    <div style={styles}>
        <Card className={styles.eventcard}>
            <div >
            <CardMedia className={styles.cardimage} image={bgimage} alt="event image"/>
            </div>
            <CardContent className={styles.cardcontent}>
                
                <div className={styles.eventtitle}>
                  <h5><Link className={styles.eventlink} to={`eventpage/${props.event.eventid}`}>{eventName}</Link></h5>
                  </div>
                <p>{eventDesc}</p>
                <p>{eventDate}</p>
            </CardContent>
            <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => {
          console.log('fav');
          setFav(!fav);
        }}>
          <FavoriteIcon sx={{color:'red'}} color={fav ? "primary": ""}/>
          
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        </CardActions>
        </Card>
    </div>
  )
  }

export default EventTile;