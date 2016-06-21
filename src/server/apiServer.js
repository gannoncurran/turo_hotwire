/* eslint-disable no-console */
// v0.1
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = 8080;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/items', (req, res) => {
  res.json({
    items: [
      {
        id: 1,
        title: 'Lorem One',
        value: 1,
      },
      {
        id: 2,
        title: 'Lorem Two',
        value: 1,
      },
      {
        id: 3,
        title: 'Lorem Three',
        value: 1,
      },
    ],
  });
});

app.post('/job', (req, res) => {
  console.log('REQUEST BODY:', req.body);
  res.json({ message: 'post was successful' });
});

// more routes for our API will happen here

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log(`api running on port ${port}`);
