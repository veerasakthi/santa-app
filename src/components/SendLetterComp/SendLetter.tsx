import { Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import "./SendLetterStyles.css";
import axios from "axios";

const SendLetter = () => {
  const [userName, setUserName] = useState("");
  const [userWish, setUserWish] = useState("");

  async function sendWishToSanta() {
    console.log(userName);
    console.log(userWish);

    const WISH_SEND_URI = "http://localhost:3001/postLetter";
    const requestBody = {
      userName: userName,
      userWish: userWish,
    };
    var sendWishResponse = await axios.post(WISH_SEND_URI, requestBody);
    console.log(sendWishResponse.status);
    console.log(sendWishResponse.data);
  }

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
          <Button variant="contained" onClick={sendWishToSanta}>
            send to santa
          </Button>
        </div>
      </div>
    </>
  );
};

export default SendLetter;

// code to short cut to generate export using es7+
// rafce
