// const axios = require('axios');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'ubuntu',
  host: '52.53.198.1',
  database: 'checkout',
  port: 5432,
});

// HELPER FUNCTION TO CHECK FOR VALID RESERVATIONS
const isValidReservation = (start, end, reservationsArray) => {
  console.log(Date.parse(start), Date.parse(end));
  for (let i = 0; i < reservationsArray[0].length; i++) {
    if (Date.parse(start) >= reservationsArray[0][i] || Date.parse(start) <= reservationsArray[1][i]) {
      return false;
    } else if (Date.parse(end) >= reservationsArray[0][i] || Date.parse(end) <= reservationsArray[1][i]) {
      return false;
    }
  }
  return true;
};

// GETS
const getUserById = (userID, cb) => {
  pool.connect((err, client, release) => {
    if (err) {
      throw new Error(err);
    }
    console.log(client);
    client.query(`SELECT * FROM users WHERE userID = $1 ;`, [userID])
      .then((res) => {
        cb(null, res.rows[0]);
      })
      .catch((err) => {
        cb(err);
      });
  });
}; 

const getPropertyByOwner = (userID, cb) => {
  const query = `SELECT * FROM properties_by_owner WHERE owner = ? ;`;
  client.execute(query, [ userID ], {prepare: true})
    .then((propertyData) => {
      cb(null, propertyData.rows[0])
    })
    .catch((err) => {
      cb(err);
    });
};

const getPropertyById = (propertyID, cb) => {
  const query = `SELECT * FROM properties_by_owner WHERE owner = ? ;`;
  client.execute(query, [ propertyID ], {prepare: true})
    .then((propertyData) => {
      cb(null, propertyData.rows[0]);
    })
    .catch((err) => {
      cb(err);
    });
};

const getReservationById = (reservationID, cb) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.log(err);
      // throw new Error(err);
    }

    const query = `SELECT * FROM reservations WHERE reservationID = $1 ;`;
    const params = [reservationID];

    client.query(query, params)
      .then((res) => {
        cb(null, res.rows[0]);
        release();
      })
      .catch((err) => {
        cb(err);
        release();
      });
  });
};

const getReservationsByUser = (userID, cb) => {
  pool.connect((err, client, release) => {
    if (err) {
      throw new Error(err);
    }

    const query = `SELECT * FROM reservations WHERE userID = $1 ;`;
    const params = [userID];

    client.query(query, params)
      .then((res) => {
        cb(null, res.rows);
        release();
      })
      .catch((err) => {
        cb(err);
        release();
      });
  });
};

const getReservationsByProperty = (propertyID, cb) => {
  pool.connect((err, client, release) => {
    if (err) {
      throw new Error(err);
    }

    const query = `SELECT * FROM reservations WHERE propertyID = $1 ;`;
    const params = [propertyID];

    client.query(query, params)
      .then((res) => {
        if (res.rows.length !== 0) {
          cb(null, res.rows);
        } else {
          cb(null, 'No reservations found for this propertyID');
        }
        release();
      })
      .catch((err) => {
        cb(err);
        release();
      });
  });
};

// POSTS
const makeReservation = (reservationDetails, cb) => {
  const {
    userID,
    propertyID,
    reservationStart,
    reservationEnd,
    adults,
    children,
    infants
  } = reservationDetails;

  const selectQuery = `SELECT reservationStart, reservationEnd FROM reservations where propertyID = $1`;
  const selectParams = [propertyID];
  const insertQuery = `INSERT INTO reservations(userID, propertyID, reservationStart, reservationEnd, adults, children, infants) values($1, $2, $3, $4, $5, $6, $7) ;`;
  const insertParams = [userID, propertyID, reservationStart, reservationEnd, adults, children, infants];

  pool.connect((connectErr, client, release) => {
    if (connectErr) {
      throw new Error(connectErr);
    }
    client.query(selectQuery, selectParams)
      .then((res) => {
        console.log('FETCHING EXISTING RESERVATION INFORMATION');
        let starts = [];
        let ends = [];
        res.rows.forEach((row) => {
          starts.push(Date.parse(row.reservationstart));
          ends.push(Date.parse(row.reservationend));
        });
        return [starts, ends];
      })
      .then((datesArray) => {
        console.log('CHECKING DESIRED RESERVATION AGAINST EXISTING RESERVATION INFORMATION');
        console.log(datesArray);
        return isValidReservation(reservationStart, reservationEnd, datesArray);
      })
      .then((valid) => {
        if (valid) {
          console.log('VALID RESERVATION PASSED, STARTING INSERTION OPERATION');
          client.query(insertQuery, insertParams)
          .then((res) => {
            release();
            console.log(res);
            cb(null, 'Reservation insertion successful!');
          })
          .catch((insertErr) => {
            release();
            cb(insertErr.detail);
          });
        } else {
          cb('Reservation collision detected, tell user to refresh the page and select a new reservation slot.');
        }
      })
      .catch((searchErr) => {
        cb(searchErr.detail);
        release();
      });
  });
};

// UPDATE
const updateReservation = (reservationID, details, cb) => {

  let updateQuery = `UPDATE reservations SET `;
  const keys = Object.keys(details);
  const updateParams = Object.values(details);

  const start = details.reservationStart;
  const end = details.reservationEnd;

  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      updateQuery += `${keys[i]} = $${i+1} WHERE reservationID = ${reservationID};`;
    } else {
      updateQuery += `${keys[i]} = $${i+1}, `;
    }
  }

  const propertyQuery = `SELECT propertyID from reservations where reservationID = $1;`;
  const propertyParam = [reservationID];
  let propertyID;

  pool.connect((err, client, release) => {
    client.query(propertyQuery, propertyParam)
      .then((res) => {
        release();
        propertyID = res.rows[0].propertyid;
      })
      .catch((err) => {
        release();
        cb(err);
      });
  });

  const reservationQuery = `SELECT reservationStart, reservationEnd from reservations where propertyID = $1`;
  const reservationParams = [propertyID];

  pool.connect((err, client, release) => {
    client.query(reservationQuery, reservationParams)
      .then((res) => {
        release();
        return res.rows;
      })
      .then((rows) => {
        let starts = [];
        let ends = [];
        rows.forEach((row) => {
          starts.push(Date.parse(row.reservationstart));
          ends.push(Date.parse(row.reservationend));
        });
        return [starts, ends];
      })
      .then((arr) => {
        const valid = isValidReservation(start, end, arr);
        if (!valid) {
          cb('Reservation collision detected, tell user to select a new reservation slot.');
          return;
        }
      })
      .then(() => {
        console.log('VALID RESERVATION PROVIDED, UPDATING EXISTING RESERVATION');
        pool.connect((err2, client2, release2) => {
          if (err) {
            throw new Error(err2);
          }
          client.query(updateQuery, updateParams)
            .then((res) => {
              cb(null, res);
              release2();
            })
            .catch((updateErr) => {
              cb(updateErr);
              release2();
            });
        });
      })
      .catch((err) => {
        cb(err1);
        release();
      })
  });
};

// DELETE
const deleteReservation = (reservationID, cb) => {
  const query = `DELETE FROM reservations where reservationID = $1`;
  const params = [reservationID];
  pool.connect((err, client, release) => {
    if (err) {
      throw new Error(err);
    }
    client.query(query, params)
      .then((res) => {
        cb(null, res);
        release();
      })
      .catch((err) => {
        cb(err);
        release();
      });
  });
};

module.exports  = {
  getUserById,
  getPropertyByOwner,
  getPropertyById,
  getReservationById,
  getReservationsByProperty,
  getReservationsByUser,
  makeReservation,
  updateReservation,
  deleteReservation
};
