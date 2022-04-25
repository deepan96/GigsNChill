import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";
// import events from "./EventData";
import axios from "axios";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { tags, categories, estates } from "../../Assets/FilterData";
import { Navigate, useNavigate } from "react-router-dom";

export default function EventHome(props) {
  const [searchValue, setSearchValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [eventDataFilter, setEventDataFilter] = useState([]);
  const [eventCategory, setEventCategory] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventCost, setEventCost] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [booked, setisBooked] = useState(false)
  const [loading, setLoading] = useState(false);

  const user_info = JSON.parse(localStorage.getItem("user"));

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
      let eventId = res.data.data;

    });
  }, []);

  // Get bookmarked events
  useEffect(() => {
    var config3 = {
      method: "get",
      url: `https://gigsnchill.herokuapp.com/bookmarks/${user_info.email}/`,
    };

    axios(config3).then((res) => {
      console.log("hi2")
      console.log(res.data.data);
      setBookmarks(res.data.data)
    });

    setLoading(true)
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
      if (eventType !== "") {
        groupData = groupData.filter((e) => {
          if (e.EventType.toLowerCase().includes(eventType.toLowerCase())) {
            return e;
          } else {
            return false;
          }
        });
      }
    }
    if (searchValue !== "") {
      setEventDataFilter(fil(groupData));
    } else {
      setEventDataFilter(groupData);
    }
  }, [eventCategory, searchValue, props.searchQuery, eventType]);

  useEffect(() => {
    var groupData = eventData;
    if (eventState !== "") {
      groupData = eventData.filter((e) => {
        if (e.State.toLowerCase().includes(eventState.toLowerCase())) {
          return e;
        } else {
          return false;
        }
      });
    }
    if (eventState === "") {
      setEventDataFilter(eventData);
    } else {
      setEventDataFilter(groupData);
    }
  }, [eventState]);

  useEffect(() => {
    var groupData = eventData;

    if (eventCost === "free") {
      groupData = eventData.filter((e) => {
        if (e.Price === 0) {
          return e;
        } else {
          return false;
        }
      });
    }
    if (eventCost !== "free") {
      setEventDataFilter(eventData);
    } else {
      setEventDataFilter(groupData);
    }
  }, [eventCost]);

  // handling category and its values
  function handleSelectCategory(e) {
    setEventCategory(e.target.value);
    console.log(e.target.value);
    setTypes(tags[e.target.value] || []);
  }

  // function handlebookmarks(events){
  //   try{
  //     let bookedevent = "1" // bookmarks.some(item => item.EventId === events.EventId);
  //     console.log(bookedevent)
  //     setisBooked(bookedevent)
  //   }
  //   catch{
  //     console.log("sad")
  //   }

  //   return
  // }

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
                value={eventState}
                onChange={(e) => setEventState(e.target.value)}
                input={<OutlinedInput label="location" id="eventlocation" />}
              >
                <MenuItem key="none" value="">
                  None
                </MenuItem>
                {estates.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={styles.control}>
              <InputLabel htmlFor="eventcost">Cost</InputLabel>
              <Select
                sx={{ width: "250px", background: "white" }}
                value={eventCost}
                onChange={(e) => setEventCost(e.target.value)}
                input={<OutlinedInput label="cost" id="eventcost" />}
              >
                <MenuItem key="none" value="">
                  Any
                </MenuItem>

                <MenuItem key={"zero"} value="free">
                  Free
                </MenuItem>
              </Select>
            </div>
          </div>
          {/* <div>Filter 1</div> */}
        </div>
        {loading && <div className={styles.rightDiv}>
          {searchValue === ""
            ? eventDataFilter.map((event) => ({event},
                <EventTile key={event.EventId} event={event} bookmarks={bookmarks} />
              ))
            : eventDataFilter.map((event) => (
                <EventTile key={event.EventId} event={event} bookmarks={bookmarks}/>
              ))}
        </div>}
      </div>
    </div>
  );
}
