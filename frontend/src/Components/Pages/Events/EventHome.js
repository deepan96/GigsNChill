import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";
import events from "./EventData";
import axios from "axios";

export default function EventHome(props) {
  const [searchValue, setSearchValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventDataFilter, setEventDataFilter] = useState([]);

  var axios = require("axios");
  var FormData = require("form-data");
  var data = new FormData();

  // getting events data-only once
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/searchevent/",
    };

    axios(config).then((res) => {
      console.log(res.data.data);
      setEventData(res.data.data);
      setEventDataFilter(res.data.data);
    });
  }, []);

  useEffect(() => {
    setSearchValue(props.searchQuery);
    console.log(props.searchQuery);
    console.log(eventData);
    const fil = (events) => {
      if (searchValue === '') {
        return events;
      }
      return events.filter((e) => {
        if (e.EventGenre.toLowerCase().includes(searchValue.toLowerCase())) {
          return e;
        } else {
          return false;
        }
      });
    };
    if(searchValue !== '') {
    setEventDataFilter(fil(eventData));
    }
    else {
      setEventDataFilter(eventData);
    }
  }, [searchValue, props.searchQuery]);
  return (
    <div style={styles}>
      <div className={styles.container}>
        {searchValue === ""
          ? eventDataFilter.map((event) => (
              <EventTile key={event.EventId} event={event} />
            ))
          : eventDataFilter.map((event) => (
              <EventTile key={event.EventId} event={event} />
            ))}
      </div>
    </div>
  );
}
