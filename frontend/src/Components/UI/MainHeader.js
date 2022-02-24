import React from 'react';

import Navigation from '../LandingPages/Navigation';
import '../UI/MainHeader.css';

const MainHeader = (props) => {
  return (
    <header className='main-header'>
      <h1>Gigs 'N Chill</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
