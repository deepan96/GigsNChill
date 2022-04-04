import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";
import events from './userData';

export default function EventHome(props) {
    const [searchValue, setSearchValue] = useState("");
    const [eventData, setEventData] = useState([]);

    useEffect(()=>{
        setSearchValue(props.searchQuery);
        const fil = (events) => {
            return events.filter((e)=> {
                if (e.eventgenre.toLowerCase().includes(searchValue.toLowerCase())) {
                return e;
            }
            else {
                return false;
            }
        });
        };
        setEventData(fil(events));
    },[searchValue, props.searchQuery]);
  return (
    <div style={styles}>
      <div className={styles.container}>
        {searchValue === "" ? events.map((event)=><EventTile event={event}/>) : eventData.map((event)=><EventTile event={event}/>)}
      </div>
    </div>
  );
}