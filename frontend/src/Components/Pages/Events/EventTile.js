import { Card, CardActions, CardContent, CardMedia, IconButton } from '@material-ui/core';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React from 'react';
import styles from './EventTile.module.css';
import bgimage from "../../Pages/Promote-Your-local-event.jpg"
function EventTile() {
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
                <div className={styles.eventtitle}><h5 onClick={eventHandler}>Event Name</h5></div>
                <p>Musical event hosted by Kalao</p>
            </CardContent>
            <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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