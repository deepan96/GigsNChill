import React from 'react';
import styles from './Home.module.css';
import Card from '../../UI/Card/Card';
import logo from '../Vector_White.png';
const Home = (props)=> {
  return (
    <div style={styles}>
    <div className={styles.home}>
      <p>Here is the home page</p>

    </div>
    </div>
  );
};

export default Home;
