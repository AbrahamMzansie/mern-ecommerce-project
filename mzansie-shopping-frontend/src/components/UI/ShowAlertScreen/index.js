import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const ShowAlertScreen = (props) => {
  return (
    <Alert style = {{marginTop : "10px"}}  variant={props.variant}>
    <p>{props.message}</p>
  </Alert>
   
  );
};

export default ShowAlertScreen;
