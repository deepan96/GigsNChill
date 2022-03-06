import { Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import styles from "./EventPage.module.css";
import bgimage from "../Promote-Your-local-event.jpg";
export default function EventPage() {
  return (
    <div>
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
            <h3>Event Name</h3>
            <div className={styles.eventdate}>
            <t>03-06-2022</t>
            </div>
            { }
            <div>
            <h8>Genre</h8> <t> . </t><h8>Event Type</h8>
            </div>
            <div className={styles.eventtime}>
                <p>Time : start to end</p>
            </div>
          </div>
          <p>
            Musical event hosted by Kalao, located in the middle of Bloomington
            downtown, which is a great place to hangout with friends.
          </p>
          <div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
