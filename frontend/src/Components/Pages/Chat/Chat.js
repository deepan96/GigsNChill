import React from "react";
import styles from "./Chat.module.css";
import { ChatEngine } from "react-chat-engine";

export default function Chat() {
  return (
    <div>
      <div className={styles.container}>
        <ChatEngine
          userName="ggnchill.events@gmail.com"
          userSecret="ABCabc123@"
          projectID="f73aab4c-c6ed-4460-b074-b2a1ebc39e63"
        />
      </div>
    </div>
  );
}
