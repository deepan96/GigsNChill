import React from "react";
import EventTile from "./EventTile";
import styles from "./EventHome.module.css";


export default function EventHome() {
    const loop = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div style={styles}>
      <div className={styles.container}>
        {loop.map((i)=><EventTile/>)}
      </div>
    </div>
  );
}
