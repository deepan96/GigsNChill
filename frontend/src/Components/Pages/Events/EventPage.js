import { Card } from '@material-ui/core'
import React from 'react'
import styles from './EventPage.module.css';
export default function EventPage() {
  return (
    <div>
        <Card className={styles.container}>
            <div>
                <p>Here is the event page showing all the details</p>
            </div>
        </Card>
    </div>
  )
}
