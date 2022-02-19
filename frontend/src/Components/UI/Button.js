import React from 'react';
import './Button.css';
function Button(props) {

  return (
    <button
      type={props.type || 'button'}
      className={`button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;