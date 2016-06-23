/* eslint-disable no-console */
// v0.1
const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const fakeData = require('./data/people');

const app = express();
const port = 8080;

// WHEN WE GET POST ROUTES AND SECURITY IN PLACE:
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/people', (req, res) => {
  res.json(fakeData);
});

// more routes for our API will happen here

// START THE SERVER
// =============================================================================
app.listen(port);

console.log(`api running on port ${port}`);
