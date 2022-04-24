import React, { useEffect, useState } from "react";
import styles from "./Bookmark.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import bgimage from "../../Pages/Promote-Your-local-event.jpg";
import { Link, Navigate } from "react-router-dom";
import { red } from "@material-ui/core/colors";

export default function Bookmark() {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const [fav, setFav] = useState(true);
  const [bookmarkData, setBookmarkData] = useState([]);
  var axios = require("axios");

  useEffect(() => {
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/bookmarks/${user_info.email}/`,
    };

    axios(config).then((res) => {
      console.log(res.data.data);
      const ud = res.data.data;
      setBookmarkData(res.data.data);
      console.log(res.data.data);
    });
  }, [fav]);

  function handleFav(eveid) {
    setFav(!fav);
    console.log("like", fav);

    // making a bookmark
    var data = new FormData();
    data.append("UserId", user_info.email);
    data.append("EventId", eveid);
    data.append("BookmarkStatus", false);
    var config = {
      method: "post",
      url: "https://gigsnchill.herokuapp.com/bookmarkevent/",
      data: data,
    };

    axios(config)
      .then((res) => {
        console.log(res.data.data);
        alert("BookMark Success!");
      })
      .catch((err) => {
        alert("Invalid BookMark Request");
        console.log(err);
      });
  }

  return (
    <div style={styles}>
      <div className={styles.container}>
        <div className={styles.bookmark}>
          {bookmarkData &&
            bookmarkData.map((ud) => (
              <Card key={ud.EventId} className={styles.eventcard}>
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
                      <Link
                        className={styles.eventlink}
                        to={`/eventpage/${ud.EventId}`}
                      >
                        {ud.EventName}
                      </Link>
                    </h5>
                  </div>
                  <p>{ud.EventDate}</p>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="add to favorites"
                    sx={{ color: red[500] }}
                    onClick={()=>handleFav(ud.EventId)}
                  >
                    {ud.BookmarkStatus && <FavoriteIcon sx={{ color: "red" }} />}
                    {!ud.BookmarkStatus && <FavoriteIcon />}
                  </IconButton>
                  {/* <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
