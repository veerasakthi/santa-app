// server.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");

const { errorHandler } = require("./nodejs/utility/appUtils");
const santaRouter = require("./nodejs/router");
const { cronSantaLetterCtrl } = require("./nodejs/controller/santaController");

const app = express();
app.use(cors());
// all errors reach here
app.use(errorHandler);

app.use(bodyParser.json());
app.use(express.static("reactjs/dist"));

// require env variables
require("dotenv").config();

// route mapping
app.use("/", santaRouter);

// batch process
cron.schedule("0,15,30,45 * * * * *", cronSantaLetterCtrl);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`app is listening on port ' ${listener.address().port}`);
});
