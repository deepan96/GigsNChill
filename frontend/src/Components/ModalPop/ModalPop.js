import React, { useState } from "react";
import styles from "./ModalPop.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";

export default function ModalPop(props) {
  const [rEmail, setREmail] = useState("");
  const [open, setOpen] = useState(props.open);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div style={styles}>
      <Modal
        className={styles.container}
        open={props.open}
        onClose={props.invokefunc}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton aria-label="share" className={styles.closebutton}>
            <CloseIcon onClick={props.invokefunc} />
          </IconButton>
          <div className={styles.content}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{paddingBottom:'20px'}}>
              Enter Recipient Mail
            </Typography>
            <div className={styles.control}>
              <input
                id="recipientemail"
                type="email"
                placeholder="abc@event.com"
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
              />
            </div>
          </div>
          <IconButton aria-label="share" className={styles.sharebutton}>
            <SendIcon/>
          </IconButton>
        </Box>
      </Modal>
      {/* <div>
                Enter Recipient Mail here:
            </div>
            <div className={styles.control}>
            <label htmlFor="recipientemail">Mail</label>
            <input
              id="recipientemail"
              type="email"
              placeholder="abc@event.com"
              value={rEmail}
              onChange={(e) => setREmail(e.target.value)}
            />
          </div> */}
    </div>
  );
}
