import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import EventHome from '../Events/EventHome';
import EventPage from '../Events/EventPage';
import styles from './Home.module.css';
import SearchField from './Search/SearchField';
const Home = (props)=> {

  const [searchQuery, setSearchQuery] = useState(''); // gets search key from searchField
  
  useEffect(()=> {
    // do nothing
  },[searchQuery]);

  return (
    <div style={styles}>
      {/* <EventPage event={event}/> */}
    <div className={styles.home}>
      <SearchField searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      {console.log(searchQuery)}
      <EventHome searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Routes>
      <Route path='eventpage/:id' element={<EventPage/>}/>
      </Routes>
    </div>
    </div>
  );
};

export default Home;
