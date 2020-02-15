DROP SCHEMA checkout CASCADE;

CREATE SCHEMA checkout;

CREATE TABLE checkout.users (
  userID INTEGER PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL
);

CREATE TABLE checkout.properties (
  propertyID  INTEGER PRIMARY KEY,
  owner INTEGER REFERENCES checkout.users (userID),
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

CREATE TABLE checkout.reservations (
  reservationID INTEGER PRIMARY KEY,
  propertyID INTEGER REFERENCES checkout.properties (propertyID),
  userID INTEGER REFERENCES checkout.users (userID),
  reservationStart DATE NOT NULL,
  reservationEnd DATE NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER NOT NULL,
  infants INTEGER NOT NULL
);

COPY checkout.users FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/users.csv' WITH (FORMAT csv);
COPY checkout.properties FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/properties.csv' WITH (FORMAT csv);
COPY checkout.reservations FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/reservations.csv' WITH (FORMAT csv);