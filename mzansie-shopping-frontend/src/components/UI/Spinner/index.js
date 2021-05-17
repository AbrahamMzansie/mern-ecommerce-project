import React from "react";
import { Spinner } from "react-bootstrap";

const ShowSpinner = (props) => {
  const style = props && props.style ? props.style : null;
  return (
    <div  style = {{...style , marginTop : "10px"}}>
      <Spinner size = "xxl" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner >
    </div>
  );
};

export default ShowSpinner;
