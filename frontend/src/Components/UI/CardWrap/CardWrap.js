import React from "react";

import styles from "./CardWrap.module.css";

const CardWrap = (props) => {
  return (
      <div style={props.styles} className={`${styles.card} ${props.className}`}>
        {props.children}
      </div>
  );
};

export default CardWrap;
