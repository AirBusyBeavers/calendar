const axios = require('axios');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'kevin_ong',
  host: 'localhost',
  database: 'checkout',
  password: '',
  port: 3211,
});

// GETS
const getUserById = (userID, cb) => {
  const query = `SELECT * FROM users_by_userID WHERE userID = ? ;`;
  client.execute(query, [ userID ], {prepare: true})
    .then((userData) => {
      cb(null, userData.rows[0]);
    })
    .catch((err) => {
      cb(err);
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

const getPropertyByID = (propertyID, cb) => {
  const query = `SELECT * FROM properties_by_owner WHERE owner = ? ;`;
  client.execute(query, [ propertyID ], {prepare: true})
    .then((propertyData) => {
      cb(null, propertyData.rows[0])
    })
    .catch((err) => {
      cb(err);
    });
};

const getReservationsByUser = (userID, cb) => {
  const query = `SELECT * FROM reservations_by_user WHERE userID = ? ;`;
  client.execute(query, [ userID ], {prepare: true})
    .then((reservationData) => {
      cb(null, reservationData.rows)
    })
    .catch((err) => {
      cb(err);
    });
};

const getReservationsByProperty = (propertyID, cb) => {
  const query = `SELECT * FROM reservations_by_property WHERE propertyID = ? ;`;
  client.execute(query, [ propertyID ], {prepare: true})
    .then((reservationData) => {
      cb(null, reservationData.rows)
    })
    .catch((err) => {
      cb(err);
    });
};

// POSTS
const makeReservation = (reservationDetails, cb) => {
  const {
    reservationID, 
    userID,
    propertyID,
    reservationStart,
    reservationEnd,
    adults,
    children,
    infants
  } = reservationDetails;
  console.log(Object.values(reservationDetails));

  const query1 = `INSERT INTO reservations(reservationID, userID, propertyID, reservationStart, reservationEnd, adults, children, infants) values(?, ?, ?, ?, ?, ?, ?, ?) ;`;

  const queries = [
    {
      query: query1,
      params: Object.values(reservationDetails)
    }, {
      query: query2,
      params: Object.values(reservationDetails)
    }
  ];

  client.batch(queries, {prepare: true})
    .then()

  client.execute(query1, Object.values(reservationDetails), {prepare: true})
    .then((output) => {
      console.log('Insert into reservations_by_property successful!');
      console.log(output);
    })
    .catch((err1) => {
      console.log('Error inserting into reservations_by_property...');
      cb(err1);
    });

  client.execute(query2, Object.values(reservationDetails), {prepare: true})
    .then((ok) => {
      console.log('Insert into reservations_by_user successful!');
      cb(null, ok);
    })
    .catch((err2) => {
      console.log('Error inserting into reservations_by_user...');
      cb(err2);
    });

};

// UPDATE

// DELETE

module.exports  = {
  getUserById,
  getPropertyByOwner,
  getPropertyByID,
  getReservationsByProperty,
  getReservationsByUser,
  makeReservation,


};
