import React, { useState } from 'react';
import EventHome from '../Events/EventHome';
import EventPage from '../Events/EventPage';
import styles from './Home.module.css';
import SearchField from './Search/SearchField';
const Home = (props)=> {

  const [searchQuery, setSearchQuery] = useState(''); // gets search key from searchField

  return (
    <div style={styles}>
      <EventPage/>
    {/* <div className={styles.home}>
      <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <EventHome/>
    </div> */}
    </div>
  );
};

export default Home;
