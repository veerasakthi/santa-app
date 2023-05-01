import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./SendLetterStyles.css";
import axios from "axios";
import { sleep } from "./helper";

const SendLetter = () => {
  const [userName, setUserName] = useState("");
  const [userWish, setUserWish] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // send letter to santa function
  async function sendWishToSanta() {
    setIsLoading(true);
    console.log(userName);
    console.log(userWish);

    const WISH_SEND_URI = "http://localhost:3001/santa/putSantaLetter";
    const requestBody = {
      userName: userName,
      wish: userWish,
    };
    var response = await axios.post(WISH_SEND_URI, requestBody);
    console.log(response.status);
    console.log(response.data);

    // hide loading
    await sleep(2);
    setIsLoading(false);

    if (response.status == 200 && response.data.status == "success") {
      // show alert
      setOpen(true);
      // hide alert
      await sleep(2);
      setOpen(false);
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // ui code
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
            id="outlined-basic userName"
            type="text"
            label="who are you ?"
            variant="outlined"
            className="input-width"
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
          />

          <TextField
            id="outlined-multiline-static userWish"
            label="what do you want for christmas?"
            multiline
            rows={5}
            className="input-width"
            onChange={(event) => setUserWish(event.target.value)}
            value={userWish}
          />

          {/* send mail to santa button */}
          <div>
            {!isLoading && (
              <Button variant="contained" onClick={sendWishToSanta}>
                send to santa
              </Button>
            )}
          </div>

          {/* loading icon on api request */}
          <div>
            {isLoading && <CircularProgress color="success" className="" />}
          </div>
        </div>

        {/* alert message */}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default SendLetter;

// code to short cut to generate export using es7+
// rafce
