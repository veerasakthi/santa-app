// server.js
// where your node app starts

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");

const santaRouter = require("./server/router");
const { mailSantaLetterCtrl } = require("./server/controller/santaController");

const app = express();
app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update with allowed origin
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(bodyParser.json());
app.use(express.static("client/dist"));

// require env variables
require("dotenv").config();

// route mapping
app.use("/", santaRouter);

// batch process
cron.schedule("0,15,30,45 * * * * *", mailSantaLetterCtrl);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
