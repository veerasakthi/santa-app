import { Button, TextField } from "@mui/material";
import React from "react";

const SendLetter = () => {
  return (
    <>
      <div className="page-body">
        {/* heading title */}
        <div className="heading-margin">
          <h1 className="text-3xl font-bold underline text-center heading-color">
            {" "}
            A letter to Santa!
          </h1>
          <h2 className="text-1xl text-center">
            Ho ho ho, what you want for christmas?
          </h2>
        </div>
        {/* input fields */}
        <div className="center-container">
          <TextField
            id="outlined-basic"
            label="who are you ?"
            variant="outlined"
            className="input-width"
          />

          <TextField
            id="outlined-multiline-static"
            label="what do you want for christmas?"
            multiline
            rows={5}
            className="input-width"
          />

          {/* send mail to santa button */}
          <Button variant="contained">send to santa</Button>
        </div>
      </div>
    </>
  );
};

export default SendLetter;

// code to short cut to generate export using es7+
// rafce
