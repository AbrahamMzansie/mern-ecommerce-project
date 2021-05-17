import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

const Card = (props) => {
  return (
    <div {...props} className="card">
      <div className="cardHeader">
        {props.headerLeft && <div>{props.headerLeft}</div>}
        {props.headerRight && props.headerRight}
      </div>
      {props.children}
    </div>
  );
};

export default Card;
