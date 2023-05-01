// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors())
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/postLetter', (request, response) => {
  response.json({msg: 'This is CORS-enabled for all origins!'})
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
