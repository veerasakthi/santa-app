import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { sleep } from "./helper";
import "./SendLetterStyles.css";
import LetterList from "./components/LetterList";
import SnackBarCommon from "./components/SnackBar";

const SendLetter = () => {
  const [userName, setUserName] = useState("");
  const [userWish, setUserWish] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSucess, setOpenSucess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [lastErrorMsg, setLastErrorMsg] = React.useState("");

  // send letter to santa function
  async function sendWishToSanta() {
    setIsLoading(true);

    const WISH_SEND_URI = "http://localhost:3001/santa/putSantaLetter";
    const requestBody = {
      userName: userName,
      wish: userWish,
    };
    var response = await axios.post(WISH_SEND_URI, requestBody);

    if (response.status == 200 && response.data.status == "success") {
      // sleep for loading
      await sleep(2);
      // clear the values from fields
      setUserName("");
      setUserWish("");
      // show alert
      setOpenSucess(true);
      // hide alert
      await sleep(2);
      setOpenSucess(false);
    } else {
      // show alert
      setLastErrorMsg(
        response.data.message ? response.data.message : "something went wrong"
      );
      setOpenError(true);
      // hide alert
      await sleep(2);
      setOpenError(false);
    }
    // loading false
    setIsLoading(false);
  }

  // ui code
  return (
    <>
      <div className="page-body">
        {/* row with input and listview */}
        <div className="main-row">
          {/* column 1 [input side] */}
          <div className="center-container">
            {/* heading title */}
            <div className="heading-margin">
              <h1 className="heading-title"> A letter to Santa! 🎄</h1>
              <div className="head-img-div">
                <img
                  className="head-img"
                  src="/assets/images/xmas_img_intro.png"
                />
              </div>
              <h2 className="text-1xl text-center">
                Ho ho ho, what you want for christmas?
              </h2>
            </div>
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
          <Divider className="isWebView" orientation="vertical" flexItem />
          <Divider className="isMobView" orientation="horizontal" flexItem />
          {/* column 2 [list view] */}
          <div className="list-view">
            <LetterList />
          </div>
        </div>

        {/* alert message */}
        {openSucess && (
          <SnackBarCommon
            open={openSucess}
            status="success"
            message="wishes sent to santa!"
          ></SnackBarCommon>
        )}

        {openError && (
          <SnackBarCommon
            open={openError}
            status="error"
            message={lastErrorMsg}
          ></SnackBarCommon>
        )}
      </div>
    </>
  );
};

export default SendLetter;
