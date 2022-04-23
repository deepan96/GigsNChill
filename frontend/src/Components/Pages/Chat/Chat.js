import React, { useState } from "react";
import { ChatEngine, getOrCreateChat, ChatList } from "react-chat-engine";
import styles from "./Chat.module.css";
import { useEffect } from "react";
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import Add from "@mui/icons-material/Add";

function Chat() {
  const user_info = JSON.parse(localStorage.getItem("user"));
  console.log(user_info);
  const [user_name, setUsername] = useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [user_name] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div style={styles}>
        <div className={styles.usersearch}>
          <div className={styles.inputfield}>
            <input
              placeholder="Username"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
          
          <button className={styles.searchbutton} onClick={() => createDirectChat(creds)}><Add/></button>
          </div>
        </div>
      </div>
    );
  }
  useEffect(() => {
    console.log(localStorage.getItem("user"));
    document.getElementsByClassName('ce-wrapper')[0].style.height = '85vh';
  }, []);

  return (
    <div style={styles}>
    <div className={styles.container}>
      <div className={styles.chatdiv}>
        <ChatEngine
          userName={user_info.fname}
          userSecret="ABCabc123@"
          projectID="f73aab4c-c6ed-4460-b074-b2a1ebc39e63"
          renderNewChatForm={(creds) => renderChatForm(creds)}
        >
          <ChatList />
        </ChatEngine>
      </div>
    </div>
    </div>
  );
}

export default Chat;
