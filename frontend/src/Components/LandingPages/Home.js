import React from 'react';
import styles from './Home.css';
import Card from '../UI/Card';
import './Home.css';
const Home = (props)=> {
  return (
    <div style={styles}>
    <Card className={styles.home}>
      {/* <h1 className={styles.heading}>Gigs 'N Chill</h1> */}
    </Card>
    </div>
  );
};

export default Home;
