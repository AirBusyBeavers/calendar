require('newrelic');
process.env.NODE_ENV = 'production';
const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');
// const legacydb = require('./db');
const db = require('../db/postgres.js');

const app = express();
const PORT = 3001;

// apply middlware
// app.use(morgan('dev'));
// app.use(parser.json());
app.use(express.urlencoded({extended: true}));

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/month', (req, res) => {
  var params = req.query;
  legacydb.getMonthAvalibility(params, (err, data) => {
    if (err) {
      console.log(`error @ getMonthAvailability`, err);
      res.sendStatus(500);
    } else {
      console.log('data @ index', data);
      let individualDayArr = [];

      data.forEach(item => {
        const startDate = item.startDate;
        const endDate = item.endDate;

        while (startDate <= endDate) {
          let indDate = startDate.toISOString().split("T")[0];
          individualDayArr.push(indDate);
          startDate.setDate(startDate.getDate() + 1);
        }
      });

      const month_year = `${params.year}-${params.month}`;
      const a = individualDayArr.filter(item => item.includes(month_year));

      console.log('filtered', a);
      res.json(a);
    }
  });
});

// New CRUD operations for SDC
// API for RESERVATIONS table (PRIMARY TABLE)
app.post('/reservations', (req, res) => {
  // const { reservationID, userID, propertyID, reservationstart, reservationend, adults, children, infants } = req.body;
  db.makeReservation(req.body, (err, ok) => {
    if (err) {
      if (typeof err === 'object') {
        res.status(500);  
      } else {
        res.status(409);
      }
      res.send(err);
    } else {
      res.status(201);
      res.send(ok);
    }
  });
});

// prioritizes retrieving reservations with following priority: reservationID > propertyID > userID
app.get('/reservations', (req, res) => {
  const { reservationID, propertyID, userID } = req.body;
  if (reservationID) {
    db.getReservationById(parseInt(reservationID), (err, reservationData) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(reservationData);
      }
    });
  } else if (propertyID) {
    db.getReservationsByProperty(parseInt(propertyID), (err, reservationData) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(reservationData);
      }
    });
  } else if (userID) {
    db.getReservationsByUser(parseInt(userID), (err, reservationData) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(reservationData);
      }
    });
  } else {
    res.status(400);
    res.send('Invalid query input, please provide a valid userID or propertyID');
  }
});

app.put('/reservations', (req, res) => {
  const { reservationID, ...rest } = req.body;
  db.updateReservation(reservationID, rest, (err, ok) => {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(ok);
    }
  });
});

app.delete('/reservations', (req, res) => {
  const { reservationID } = req.body;
  db.deleteReservation(reservationID, (err, ok) => {
    if (err) {
      console.log(`Error deleting reservation ${reservationID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(`Reservation ${reservationID} has been deleted`);
    }
  });
});

// API for USERS table (if needed)
app.post('/users', (req, res) => {
  // const { firstName, lastName, listings } = req.body;
  db.createUser(req.body)
    .then((userID) => {
      res.status(200);
      res.send(userID);
    })
    .catch((err) => {
      console.log(`Error adding user. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

app.get('/users', (req, res) => {
  const { userID } = req.body;
  console.log(userID);
  db.getUserById(parseInt(userID), (err, userData) => {
    if (err) {
      console.log(`Error getting user with userID ${userID}`);
      res.status(500);
      res.send(err);
    } else {
      console.log(`Here's some user information for: ${userID}`);
      res.status(200);
      res.send(userData);
    }
  });
});

// API for PROPERTIES table (if needed)
app.post('/properties', (req, res) => {
  // const { ...propertyParams  } = req.body;
  db.createProperty(req.body)
    .then((propertyID) => {
      res.status(200);
      res.send(propertyID);
    })
    .catch((err) => {
      console.log(`Error adding user. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

// get prioritizes query by ownerID over propertyID
app.get('/properties', (req, res) => {
  const { owner, propertyID } = req.body;
  if (owner) {
    db.getPropertyByOwner(parseInt(owner), (err, propertyData) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(propertyData);
      }
    });
  } else if (propertyID) {
    db.getPropertyById(parseInt(propertyID), (err, propertyData) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.status(200);
        res.send(propertyData);
      }
    });
  } else {
    res.status(400);
    res.send('Invalid query input, please provide a valid userID or propertyID');
  }
  
});

// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));