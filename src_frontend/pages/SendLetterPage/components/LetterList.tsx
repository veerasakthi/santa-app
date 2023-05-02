import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const LetterList = () => {
  const [santaLetterList, setSantaLetterList] = useState([]);
  // counter for reload
  const [count, setCount] = useState(0);

  useEffect(() => {
    // get letter list on init
    getLetterList();

    // reload at frequent interval
    const interval = setInterval(() => {
      // refresh screen every 10 seconds
      getLetterList();
    }, 10000); // update count every 10 seconds

    return () => clearInterval(interval);
  }, []);

  function getLetterList() {
    const LETTER_LIST_URI = "http://localhost:3001/santa/getLetters";
    axios
      .post(LETTER_LIST_URI, {})
      .then(function (response) {
        // handle response here
        console.log(response);
        if (response.status == 200 && response.data.status == "success") {
          if (response.data.data.length > 0) {
            setSantaLetterList(response.data.data);
          }
        }
      })
      .catch(function (error) {
        //handle errors
        console.log(error);
      });
  }

  return (
    <>
      <div className="letters-title "> Santa's letters :</div>
      <List
        className="overflow-letters"
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {santaLetterList.map((letter) => {
          return (
            <div key={letter["letterId"]}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={letter["userName"]}
                    src="/assets/images/todo.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={letter["userName"]}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {new Date(letter["insertTime"]).toLocaleString()}
                      </Typography>
                      {" - " + letter["wish"]}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </>
  );
};

export default LetterList;
