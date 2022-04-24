import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import styles from "./Profile.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BigCalendar from "react-big-calendar";
import CardWrap from "../../UI/CardWrap/CardWrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import bgimage from "../../Pages/Promote-Your-local-event.jpg";
import { Link, Navigate} from "react-router-dom";
import { red } from "@material-ui/core/colors";

// New
import EasyEdit from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Profile(props) {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState("");
  const [fEvents, setFEvents] = useState([]);
  const [cEvents, setCEvents] = useState([]);
  const [pEvents, setPEvents] = useState([]);


  const save = (value) => {alert(value)}
  const cancel = () => {}

  function changeUname(){
    console.log("edit mode")
  }
  
  var axios = require("axios");
  // var FormData = require("form-data");
  // var data = new FormData();
  // data.append()
  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/viewprofile/${user_info.type.toLowerCase()}/${
        user_info.email
      }/`,
    };
    var fe = [];
    axios(config).then((res) => {
      console.log("SUp")
      console.log(res.data.data);
      const uad = res.data.data;
      fe = res.data.data.FutureEvents;

      console.log("hi2")
      console.log(fe)

      // Set events for calendar data
      let CalendarEvents = fe.map(
        obj => {
            return {
                "title" : obj.EventName,
                "date": obj.EventDate,
            }
        })
          
      setUserData(res.data.data);
      setCEvents(CalendarEvents)
      setFEvents(fe);
      setPEvents(res.data.data.PastEvents);
      // console.log(fEvents);
      // console.log(fe);
    });
  }, []);

  return (
    <div className={styles.splitScreen}>
      <div className={styles.rightPane}>
        <CardWrap className={styles.CardView2}>
          <div className={styles.container}>
            <div className={styles.userdiv}>
              <div className={styles.TextBox}>
                <p className={styles.InputText}>First Name:</p>
                <EasyEdit
                  type="text"
                  placeholder={userData.FirstName}
                  onSave={save}
                  onCancel={cancel}
                  saveButtonLabel={<FontAwesomeIcon icon={faCheck}/>}
                  cancelButtonLabel={<FontAwesomeIcon icon={faMinus} />}
                  saveButtonStyle = {styles.savebutton}
                  cancelButtonStyle = {styles.cancelbutton}
                />
              </div>
              <div className={styles.TextBox}>
                <p className={styles.InputText}>Last Name:</p>
                <EasyEdit
                  type="text"
                  placeholder={userData.LastName}
                  onSave={save}
                  onCancel={cancel}
                  saveButtonLabel={<FontAwesomeIcon icon={faCheck}/>}
                  cancelButtonLabel={<FontAwesomeIcon icon={faMinus} />}
                  saveButtonStyle = {styles.savebutton}
                  cancelButtonStyle = {styles.cancelbutton}
                />
              </div>
              <div className={styles.TextBox}>
                <p className={styles.InputText}>Phone Number:</p>
                <EasyEdit
                  type="text"
                  placeholder={userData.Mobile}
                  onSave={save}
                  onCancel={cancel}
                  saveButtonLabel={<FontAwesomeIcon icon={faCheck}/>}
                  cancelButtonLabel={<FontAwesomeIcon icon={faMinus} />}
                  saveButtonStyle = {styles.savebutton}
                  cancelButtonStyle = {styles.cancelbutton}
                />
              </div>
              <div className={styles.TextBox}>
                <p className={styles.InputText}>Password:</p>
                <EasyEdit
                  type="text"
                  placeholder="********"
                  onSave={save}
                  onCancel={cancel}
                  saveButtonLabel={<FontAwesomeIcon icon={faCheck}/>}
                  cancelButtonLabel={<FontAwesomeIcon icon={faMinus} />}
                  saveButtonStyle = {styles.savebutton}
                  cancelButtonStyle = {styles.cancelbutton}
                />
              </div>
            </div>
            
            <div className={styles.usercalendar}>
              <FullCalendar
                defaultView="dayGridMonth"
                header={{
                  left: "prev, next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                themeSystem="Simplex"
                plugins={[dayGridPlugin]}
                events= {cEvents}
                handleWindowResize={true}
                showNonCurrentDates={false}
                height="auto"
              />
            </div>
          </div>
        </CardWrap>
      </div>

      <div className={styles.leftPane}>          
          <div className={styles.heading}>
            <h3>Upcoming Events</h3>
          </div>

          <div className={styles.userupcoming}>
            <div className={styles.subcontainer}>
              {fEvents &&
                fEvents.map((ud) => (
                  <Card className={styles.eventcard}>
                    {console.log(ud)}
                    <div>
                      <CardMedia
                        className={styles.cardimage}
                        image={ud.ImageUrl}
                        alt="event image"
                      />
                    </div>
                    <CardContent className={styles.cardcontent}>
                      <div className={styles.eventtitle}>
                        <h5>
                          {user_info.type === "User" && (
                            <Link
                              className={styles.eventlink}
                              to={`/booking/${ud.BookingId}`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                          {user_info.type === "Host" && (
                            <Link
                              className={styles.eventlink}
                              to={`/eventdetails`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                        </h5>
                      </div>
                      <p>{ud.EventDate}</p>
                      <div>
                        <p>No. of Tickets Available: {ud.SeatsAvailable}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {!fEvents && (
                <div>No Events to Display. Reserve for a Event now!</div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            <h3>Past Events</h3>
          </div>
          <div className={styles.userupcoming}>
            <div className={styles.subcontainer}>
              {pEvents &&
                pEvents.map((ud) => (
                  <Card className={styles.eventcard}>
                    <div>
                      <CardMedia
                        className={styles.cardimage}
                        image={ud.ImageUrl}
                        alt="event image"
                      />
                    </div>
                    <CardContent className={styles.cardcontent}>
                      <div className={styles.eventtitle}>
                      <h5>
                          {user_info.type === "User" && (
                            <Link
                              className={styles.eventlink}
                              to={`/booking/${ud.BookingId}`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                          {user_info.type === "Host" && (
                            <Link
                              className={styles.eventlink}
                              to={`/eventdetails`}
                            >
                              {ud.EventName}
                            </Link>
                          )}
                        </h5>
                      </div>
                      <p>{ud.EventDate}</p>
                      <div>
                        <p>No. of Tickets Available: {ud.SeatsAvailable}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              {!fEvents && <div>No Events to Display.</div>}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile;
