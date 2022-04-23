import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";
// import events from "./EventData";
import axios from "axios";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { tags, categories } from "../../Assets/FilterData";
import { Navigate, useNavigate } from "react-router-dom";

export default function EventHome(props) {
  const [searchValue, setSearchValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventDataFilter, setEventDataFilter] = useState([]);
  const [eventCategory, setEventCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  var axios = require("axios");
  var FormData = require("form-data");
  var data = new FormData();

  // useEffect(()=>{
  //   var d = JSON.parse(localStorage.getItem('user'));
  //   if (d && d.isLoggedIn) {
  //     // navigate('')
  //     console.log("Not logged in")
  //   }
  // },[])

  // getting events data-only once
  useEffect(() => {
    var config = {
      method: "get",
      url: "https://gigsnchill.herokuapp.com/searchevent/",
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
      if (searchValue === "") {
        return events;
      }
      return events.filter((e) => {
        if (e.EventName.toLowerCase().includes(searchValue.toLowerCase())) {
          return e;
        } else {
          return false;
        }
      });
    };
    var groupData = eventData;
    if (eventCategory !== "") {
      groupData = eventData.filter((e) => {
        if (e.EventGenre.toLowerCase().includes(eventCategory.toLowerCase())) {
          return e;
        } else {
          return false;
        }
      });
    }
    if (searchValue !== "") {
      setEventDataFilter(fil(groupData));
    } else {
      setEventDataFilter(groupData);
    }
  }, [eventCategory, searchValue, props.searchQuery]);

  // handling category and its values
  function handleSelectCategory(e) {
    setEventCategory(e.target.value);
    console.log(e.target.value);
    setTypes(tags[e.target.value] || []);
  }

  return (
    <div style={styles}>
      <div className={styles.container}>
        <div className={styles.leftDiv}>
          <div className={styles.heading}>Select Filters</div>
          <div className={styles.categorydiv}>
            <div className={styles.control}>
              <InputLabel htmlFor="eventgenre">Category</InputLabel>
              <Select
                sx={{ width: "250px", background: "white" }}
                value={eventCategory}
                onChange={handleSelectCategory}
                input={<OutlinedInput label="Category" id="eventgenre" />}
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {categories.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={styles.control}>
              <InputLabel htmlFor="eventtype">Type</InputLabel>
              <Select
                sx={{ width: "250px", background: "white" }}
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                input={<OutlinedInput label="Type" id="eventtype" />}
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {types &&
                  types.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className={styles.control}>
              <InputLabel htmlFor="eventlocation">Location(State)</InputLabel>
              <Select
                sx={{ width: "250px", background: "white" }}
                value={eventCategory}
                onChange={handleSelectCategory}
                input={<OutlinedInput label="Category" id="eventlocation" />}
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {categories.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          {/* <div>Filter 1</div> */}
        </div>
        <div className={styles.rightDiv}>
          {searchValue === ""
            ? eventDataFilter.map((event) => (
                <EventTile key={event.EventId} event={event} />
              ))
            : eventDataFilter.map((event) => (
                <EventTile key={event.EventId} event={event} />
              ))}
        </div>
      </div>
    </div>
  );
}
