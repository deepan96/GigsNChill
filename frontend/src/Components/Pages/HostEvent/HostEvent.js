import React, { useEffect, useState } from "react";
import CardWrap from "../../UI/CardWrap/CardWrap";
import styles from "./HostEvent.module.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import axios from "axios";
import { format, parseISO, set } from "date-fns";
import moment from "moment";
import { Alert } from "@mui/material";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { tags, categories } from "../../Assets/FilterData";

function HostEvent(props) {
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventGenre, setEventGenre] = useState("");
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
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventZipc, setEventZipc] = useState("");

  const [errorFound, setErrorFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error in the Fields.");
  const [errorSeverity, setErrorSeverity] = useState("error");

  // image URL
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [imageProgress, setImageProgress] = useState(0);

  const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   types = [];
  //   console.log(eventGenre)
  //   console.log(eventGenre in tags)
  //   console.log(tags, tags['Music'])
  //   console.log(categories)
  //   if (eventGenre) {
  //     types=tags[eventGenre];
  //   }
  // }, [eventGenre]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    // if not HOST redirect to Home
    if (data.type !== "Host") {
      navigate("/");
    }
  }, []);

  const handleImageAsFile = (e) => {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    setImageAsFile(image);
  };
  const uploadFiles = (file) => {
    console.log(file);
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          // console.log(url)
          setImageAsUrl(url)
        );
      }
    );
  };

  async function handleImage() {
    await uploadFiles(imageAsFile);
  }

  function handleSelectCategory(e) {
    setEventGenre(e.target.value);
    console.log(e.target.value);
    setTypes(tags[e.target.value] || []);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (
      !eventName ||
      !eventDesc ||
      !eventGenre ||
      !eventType ||
      !eventDate ||
      !eventStartTime ||
      !eventEndTime ||
      !eventPerformer ||
      !eventCapacity ||
      !eventPrice ||
      !eventHMail ||
      !street ||
      !city ||
      !eventState ||
      !eventZipc
    ) {
      setErrorFound(true);
      setErrorMessage("Enter all fields.");
      return;
    } else {
      var axios = require("axios");
      var FormData = require("form-data");
      // handling date formatting
      console.log(eventDate);
      const d = moment(eventDate, "yyyy-MM-DD").format("yyyy-MM-DD");
      setEventDate((_) => d);

      const t = moment(eventStartTime, "HH:mm:ss").format("HH:mm:ss");
      setEventStartTime(t);
      const et = moment(eventEndTime, "HH:mm:ss").format("HH:mm:ss");
      setEventEndTime(et);

      //handling image
      // uploadFiles(imageAsFile);

      var data = new FormData();
      data.append("EventName", eventName.toString());
      data.append("EventDescription", eventDesc.toString());
      data.append("EventGenre", eventGenre.toString());
      data.append("EventType", eventType.toString());
      data.append("EventDate", d.toString());
      data.append("EventStartTime", eventStartTime.toString());
      data.append("EventEndTime", eventEndTime.toString());
      data.append("Performer", eventPerformer.toString());
      data.append("MaxNoOfSeats", eventCapacity.toString());
      data.append("Price", eventPrice.toString());
      data.append("HostEmail", eventHMail.toString());
      data.append("Address", street.toString());
      data.append("City", city.toString());
      data.append("State", eventState.toString());
      data.append("ZipCode", eventZipc.toString());
      data.append("ImageUrl", imageAsUrl);
      var config = {
        method: "post",
        url: "https://gigsnchill.herokuapp.com/addnewevent/",
        data: data,
      };

      axios(config)
        .then((res) => {
          if (res.data.status === "error") {
            console.log(data);
            setErrorFound(true);
            setErrorMessage("Event must be hosted by registered Host only.");
            return;
          } else {
            console.log(res);
            setEventName("");
            setEventDesc("");
            setEventDate("");
            setEventType("");
            setEventGenre("");
            setEventStartTime("");
            setEventEndTime("");
            setStreet("");
            setCity("");
            setEventState("");
            setEventZipc("");
            setEventCapacity("");
            setEventHName("");
            setEventPerformer("");
            setEventHMail("");
            setEventCapacity("");
            setEventPrice("");
            setImageAsFile("");
            setImageAsUrl("");
            setErrorFound(true);
            setErrorSeverity("success");
            setErrorMessage("Event Successfully Hosted :))");
          }
          console.log(
            eventName,
            eventDesc,
            eventGenre,
            eventType,
            eventDate,
            eventStartTime,
            eventEndTime,
            eventPerformer,
            eventCapacity,
            eventPrice,
            eventHMail,
            street,
            city,
            eventState,
            eventZipc,
            imageAsUrl
          );
        })
        .catch((err) => alert("Enter Proper Event details"));
    }
  }

  return (
    <div style={styles}>
      <CardWrap className={styles.container}>
        {errorFound && <Alert severity={errorSeverity}>{errorMessage}</Alert>}
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

            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Description"
              minRows={3}
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            />
          </div>
          {/* <div className={styles.control}>
            <label htmlFor="eventgenre">Genre</label>
            <input
              id="eventgenre"
              type="text"
              placeholder="Genre"
              value={eventGenre}
              onChange={(e) => setEventGenre(e.target.value)}
            />
          </div> */}

          <div className={styles.categorydiv}>
            <div className={styles.control}>
              <InputLabel htmlFor="eventgenre">Category</InputLabel>
              <Select
                required
                sx={{ width: "250px", background: "white" }}
                value={eventGenre}
                onChange={handleSelectCategory}
                input={<OutlinedInput label="Category" id="eventgenre" />}
              >
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
                {types &&
                  types.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>

          {/* <div className={styles.control}>
            <label htmlFor="eventtype">Type</label>
            <input
              id="eventtype"
              type="text"
              placeholder="Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div> */}
          <div className={styles.control}>
            <label htmlFor="eventdate">Pick Date</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Event On"
                cancelText="Please select a date"
                clearable={true}
                disablePast={true}
                showTodayButton={true}
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
            <div className={styles.addressdiv}>
              <input
                id="street"
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                id="City"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                id="state"
                type="text"
                placeholder="State"
                value={eventState}
                onChange={(e) => setEventState(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.control}>
            <label htmlFor="zipcode">ZipCode</label>
            <input
              id="zipcode"
              type="text"
              placeholder="123456"
              value={eventZipc}
              onChange={(e) => setEventZipc(e.target.value)}
            />
          </div>
          <div className={styles.control}>
            <input onChange={handleImageAsFile} type="file" />
            <Button
              type="button"
              variant="contained"
              component="span"
              sx={{ width: 90 }}
              onClick={handleImage}
            >
              Upload
            </Button>
          </div>
          <div className={styles.addevent}>
            <button
              className={styles.addbutton}
              type="button"
              onClick={submitHandler}
            >
              Add Event
            </button>
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
