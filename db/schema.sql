DROP DATABASE IF EXISTS checkout;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

CREATE DATABASE checkout;

USE checkout;

SELECT NOW();

CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
  propertyID SERIAL PRIMARY KEY,
  owner INTEGER REFERENCES users (userID),
  streetAddress VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zipCode VARCHAR(255) NOT NULL,
  basePrice INTEGER NOT NULL,
  cleaningPrice INTEGER NOT NULL,
  servicePrice  INTEGER NOT NULL,
  maxDuration  INTEGER NOT NULL,
  lastReservationDate INTEGER NOT NULL
);

CREATE TABLE reservations (
  reservationID SERIAL PRIMARY KEY,
  propertyID INTEGER REFERENCES properties (propertyID),
  userID INTEGER REFERENCES users (userID),
  reservationStart VARCHAR(255) NOT NULL,
  reservationEnd VARCHAR(255) NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  infants INTEGER NOT NULL
);

COPY public.users(firstName, lastName) FROM './db/users.csv' WITH (FORMAT csv);
SELECT NOW();
COPY public.properties(owner, streetAddress, city, state, zipCOde, basePrice, cleaningPrice, servicePrice, maxDuration, lastReservationDate) FROM '.db//properties.csv' WITH (FORMAT csv);
SELECT NOW();
COPY public.reservations(propertyID, userID, reservationStart, reservationEnd, adults, children, infants) FROM './db/reservations.csv' WITH (FORMAT csv);
SELECT NOW();

CREATE INDEX property_idx ON reservations(propertyID);
CREATE INDEX user_idx ON reservations(userID);
CREATE INDEX owner_idx ON properties(owner);

SELECT NOW();
