import React from 'react'
import styles from './MyEvents.module.css';

export default function MyEvents() {
  return (
    <div style={styles}>
        <div className={styles.container}>
            The list of attendees for this event
        </div>
    </div>
  )
}
