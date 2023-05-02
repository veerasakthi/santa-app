// server.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");

const santaRouter = require("./app/router");
const { mailSantaLetterCtrl } = require("./app/controller/santaController");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// require env variables
require("dotenv").config();

// route mapping
app.use("/", santaRouter);

// batch process
cron.schedule("0,15,30,45 * * * * *", mailSantaLetterCtrl);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
