import React from 'react';

import './Navigation.css';

const Navigation = (props) => {
  return (
    <nav className="nav">
      {props.isLoggedIn && (<ul>
        
          <li>
            <a href="/">Users</a>
          </li>
        
          <li>
            <a href="/">Admin</a>
          </li>
       
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        
      </ul>
      )}
    </nav>
  );
};

export default Navigation;
