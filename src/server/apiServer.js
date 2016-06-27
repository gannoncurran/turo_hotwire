/* eslint-disable no-console, strict */
// v0.1
'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const port = 8080;

// CORS SETUP
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/people', (req, res) => {
  const fakeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data', 'people.json')));
  res.json(fakeData);
});

app.post('/person/:id/counter/:value', (req, res) => {
  let updated;
  const fakeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data', 'people.json')));
  const updatedPeople = fakeData.people.map((person) => {
    if (person.id.toString() === req.params.id) {
      const updatedPerson = person;
      updatedPerson.counter = parseInt(req.params.value, 10);
      updated = updatedPerson;
      return updatedPerson;
    }
    return person;
  });
  fakeData.people = updatedPeople;
  fs.writeFileSync(path.resolve(__dirname, 'data', 'people.json'), JSON.stringify(fakeData));
  res.json(updated);
  res.end();
});

// more routes for our API will happen here

// START THE SERVER
// =============================================================================
app.listen(port);

console.log(`api running on port ${port}`);
