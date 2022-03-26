import React, { useState } from "react";
import CardWrap from "../../UI/CardWrap/CardWrap";
import styles from "./HostEvent.module.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

function HostEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventGenre, setEventGenre] = useState();
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventPerformer, setEventPerformer] = useState("");
  const [eventNoSeats, setEventNoSeats] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventHName, setEventHName] = useState("");
  const [eventHMail, setEventHMail] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [evnetZipc, setEventZipc] = useState("");

  function submitHandler(event) {
    event.preventdefault();
  }
  function handleEvent() {

  }
  return (
    <div style={styles}>
      <CardWrap className={styles.container}>
        <div className={styles.heading}>
          <h4>Excited to see the Event</h4>
        </div>
        <form onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="eventname">Event Name</label>
            <input
              id="eventname"
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventdesc">Description</label>
            {/* <input
              id="eventdesc"
              type="text"
              placeholder="Description"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            /> */}
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Description"
              minRows={3}
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventgenre">Genre</label>
            <input
              id="eventgenre"
              type="text"
              placeholder="Genre"
              value={eventGenre}
              onChange={(e) => setEventGenre(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventtype">Type</label>
            <input
              id="eventtype"
              type="text"
              placeholder="Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventdate">Pick Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                // label="Basic example"
                value={eventDate}
                onChange={(e) => setEventDate(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.control}>
            <div className={styles.timediv}>
              <div className={styles.lefttime}>
                <label htmlFor="eventStime">Start</label>
                <input
                  type="time"
                  value={eventStartTime}
                  onChange={(e) => setEventStartTime(e.target.value)}
                />
              </div>

              <div className={styles.righttime}>
                <label htmlFor="eventEtime">End</label>
                <input
                  type="time"
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.control}>
            <label htmlFor="eventperf">Performer</label>
            <input
              id="eventperf"
              type="text"
              placeholder="Performer"
              value={eventPerformer}
              onChange={(e) => setEventPerformer(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventcapacity">Max. No. of Seats</label>
            <input
              id="eventcapacity"
              type="number"
              placeholder="Seats"
              value={eventCapacity}
              onChange={(e) => setEventCapacity(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="eventprice">Cost of a Ticket</label>
            <input
              id="eventprice"
              type="number"
              placeholder="Price"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="hostname">Host Name</label>
            <input
              id="hostname"
              type="text"
              placeholder="Name.."
              value={eventHName}
              onChange={(e) => setEventHName(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="hostmail">Mail</label>
            <input
              id="hostmail"
              type="email"
              placeholder="abc@event.com"
              value={eventHMail}
              onChange={(e) => setEventHMail(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="street 123block city"
              value={eventAddress}
              onChange={(e) => setEventAddress(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="zipcode">ZipCode</label>
            <input
              id="zipcode"
              type="text"
              placeholder="123456"
              value={evnetZipc}
              onChange={(e) => setEventZipc(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <input accept="*/" multiple type="file" />
            <Button variant="contained" component="span" sx={{ width: 90 }}>
              Upload
            </Button>
          </div>
          <div className={styles.addevent}>
              <button className = {styles.addbutton} type='submit' onClick={handleEvent}>Add Event</button>
          </div>
        </form>
      </CardWrap>
    </div>
  );
}
export default HostEvent;

// <div className={styles.control}>
//           <label htmlFor="eventStime">Date</label>
//           <input type='date' value={eventStartTime} onChange={(e)=>setEventStartTime(e.target.value)} min={utils().getToday()}/>
//           </div>
//           <div className={styles.control}>
//           <Calendar
//       value={eventDate}
//       onChange={(e) => setEventDate(e)}
//       minimumDate={utils().getToday()}
//       shouldHighlightWeekends
//     />
//           </div>
