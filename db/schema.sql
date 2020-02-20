DROP TABLE reservations;
DROP TABLE properties;
DROP TABLE users;

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

COPY public.users FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/users.csv' WITH (FORMAT csv);
SELECT NOW();
COPY public.properties FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/properties.csv' WITH (FORMAT csv);
SELECT NOW();
COPY public.reservations FROM '/Users/kevin_ong/HackReactor/SDC/calendar/db/reservations.csv' WITH (FORMAT csv);
SELECT NOW();

CREATE INDEX property_idx ON reservations(propertyID);
CREATE INDEX user_idx ON reservations(userID);
CREATE INDEX owner_idx ON properties(owner);

SELECT NOW();

-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000001, 15001, 15001, 'startdate1', 'enddate1', 1, 1, 1);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000002, 15002, 15002, 'startdate2', 'enddate2', 2, 2, 2);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000003, 15003, 15003, 'startdate3', 'enddate3', 3, 3, 3);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000004, 15004, 15004, 'startdate4', 'enddate4', 4, 4, 4);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000005, 15005, 15005, 'startdate5', 'enddate5', 5, 5, 5);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000006, 15006, 15006, 'startdate6', 'enddate6', 6, 6, 6);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000007, 15007, 15007, 'startdate7', 'enddate7', 7, 7, 7);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000008, 15008, 15008, 'startdate8', 'enddate8', 8, 8, 8);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000009, 15009, 15009, 'startdate9', 'enddate9', 9, 9, 9);
-- INSERT INTO reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) VALUES(20000010, 15010, 15010, 'startdate10', 'enddate10', 10, 10, 10);

-- UPDATE reservations SET propertyID = 12341, reservationStart = 'newstartdate1', reservationEnd = 'newenddate1' where reservationID = 20000001;
-- UPDATE reservations SET propertyID = 12342, reservationStart = 'newstartdate2', reservationEnd = 'newenddate2' where reservationID = 20000002;
-- UPDATE reservations SET propertyID = 12343, reservationStart = 'newstartdate3', reservationEnd = 'newenddate3' where reservationID = 20000003;
-- UPDATE reservations SET propertyID = 12344, reservationStart = 'newstartdate4', reservationEnd = 'newenddate4' where reservationID = 20000004;
-- UPDATE reservations SET propertyID = 12345, reservationStart = 'newstartdate5', reservationEnd = 'newenddate5' where reservationID = 20000005;
-- UPDATE reservations SET propertyID = 12346, reservationStart = 'newstartdate6', reservationEnd = 'newenddate6' where reservationID = 20000006;
-- UPDATE reservations SET propertyID = 12347, reservationStart = 'newstartdate7', reservationEnd = 'newenddate7' where reservationID = 20000007;
-- UPDATE reservations SET propertyID = 12348, reservationStart = 'newstartdate8', reservationEnd = 'newenddate8' where reservationID = 20000008;
-- UPDATE reservations SET propertyID = 12349, reservationStart = 'newstartdate9', reservationEnd = 'newenddate9' where reservationID = 20000009;
-- UPDATE reservations SET propertyID = 123410, reservationStart = 'newstartdate10', reservationEnd = 'newenddate10' where reservationID = 20000010;

-- DELETE FROM reservations WHERE reservationID = 20000001;
-- DELETE FROM reservations WHERE reservationID = 20000002;
-- DELETE FROM reservations WHERE reservationID = 20000003;
-- DELETE FROM reservations WHERE reservationID = 20000004;
-- DELETE FROM reservations WHERE reservationID = 20000005;
-- DELETE FROM reservations WHERE reservationID = 20000006;
-- DELETE FROM reservations WHERE reservationID = 20000007;
-- DELETE FROM reservations WHERE reservationID = 20000008;
-- DELETE FROM reservations WHERE reservationID = 20000009;
-- DELETE FROM reservations WHERE reservationID = 20000010;
