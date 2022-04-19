import React from 'react';
import './Pagebutton.css';
function PageButton(props) {

  return (
    <button
      type={props.type || 'button'}
      className={`pagebutton ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default PageButton;