import React from 'react';

import Card from '../UI/Card';
import './Home.css';
import Navigation from '../LandingPages/Navigation';
const Home = (props)=> {
  return (
    <Card className="home">
      <h1>Gigs 'N Chill</h1>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </Card>
  );
};

export default Home;
