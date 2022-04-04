import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";
import events from "./EventData";
import axios from "axios";

export default function EventHome(props) {
  const [searchValue, setSearchValue] = useState("");
  const [eventData, setEventData] = useState([]);

  var axios = require("axios");
  var FormData = require("form-data");
  var data = new FormData();

  // getting events data
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/searchevent/",
    };

    axios(config).then((res) => {
      console.log(res.data.data);
      setEventData(res.data.data);
    });
  }, []);

  useEffect(() => {
    setSearchValue(props.searchQuery);
    const fil = (events) => {
      return events.filter((e) => {
        if (e.EventGenre.toLowerCase().includes(searchValue.toLowerCase())) {
          return e;
        } else {
          return false;
        }
      });
    };
    setEventData(fil(eventData));
  }, [searchValue, props.searchQuery]);
  return (
    <div style={styles}>
      <div className={styles.container}>
        {searchValue === ""
          ? eventData.map((event) => (
              <EventTile key={event.EventId} event={event} />
            ))
          : eventData.map((event) => (
              <EventTile key={event.EventId} event={event} />
            ))}
      </div>
    </div>
  );
}
