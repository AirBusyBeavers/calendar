const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');
const legacydb = require('./db');
const db = require('../db');

const app = express();
const PORT = 3001;

// apply middlware
app.use(morgan('dev'));
app.use(parser.json());

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
app.post('/reservations', (req, res) => {
  // const { userID, propertyID, start, end, adults, children, infants } = req.body;
  db.makeReservation(req.body)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error making reservation. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.end();
    })
});

app.get('/reservations/:propertyID', (req, res) => {
  const { propId } = req.body;
  db.getReservations(propId)
    .then((reservations) => {
      res.status(200);
      res.send(reservations);
    })
    .catch((err) => {
      console.log(`Error getting information from database for property ${propertyID}. \nThe following error message has been generated:\n`, err)
      res.status(500);
      res.end();
    })
});

app.put('/reservations', (req, res) => {
  // const { reservationID, resStart, resEnd, count } = req.body;
  db.updateReservation(req.body)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error updating reservation ${reservationID}. \nThe following error message has been generated:\n`, err);
    })
});

app.delete('/reservations/:reservationID', (req, res) => {
  const { reservationID } = req.body;
  db.deleteReservation(resId)
    .then((ok) => {
      res.status(200);
      res.send(ok)
    })
    .catch((err) => {
      console.log(`Error deleting reservation ${reservationID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
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

app.get('/users/:userID', (req, res) => {
  const { userID } = req.body;
  db.findUser(userID)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error finding user. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

app.put('/users/:userID', (req, res) => {
  db.updateUser(req.body)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error adding user ${reservationID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

app.delete('/users/:userID', (req, res) => {
  const { userID } = req.body;
  db.addUser(userID)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error adding user ${userID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

// API for PROPERTIES table (if needed)
app.post('/properties', (req, res) => {
  // const { address, pricingInfo,  } = req.body;
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

app.get('/properties/:propertyID', (req, res) => {
  const { propertyID } = req.body;
  db.findProperty(propertyID)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error finding property entry: ${propertyID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

app.put('/properties/:propertyID', (req, res) => {
  db.updateProperty(req.body)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error patching property entry: ${propertyID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

app.delete('/properties/:propertyID', (req, res) => {
  const { userID } = req.body;
  db.deleteProperty(propertyID)
    .then((ok) => {
      res.status(200);
      res.send(ok);
    })
    .catch((err) => {
      console.log(`Error deleting property entry: ${propertyID}. \nThe following error message has been generated:\n`, err);
      res.status(500);
      res.send(err);
    });
});

// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));