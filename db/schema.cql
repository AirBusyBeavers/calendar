CREATE KEYSPACE checkout WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

CREATE TABLE properties (
  propertyID int,
  streetAddress text,
  city text,
  state text,
  zipCode text,
  owner int,
  basePrice smallint,
  cleaningPrice tinyint,
  servicePrice  tinyint,
  maxDuration  tinyint,
  lastReservationDate tinyint,
  PRIMARY KEY (propertyID)
);

CREATE TABLE reservations (
  reservationID int,
  userID int,
  propertyID int,
  reservationStart text,
  reservationEnd text,
  adults tinyint,
  children tinyint,
  infants tinyint,
  PRIMARY KEY (reservationID)
);

CREATE TABLE users (
  userID int,
  firstName text,
  lastName text,
  PRIMARY KEY (userID)
);
-- COPY commands for seeding

COPY properties (
  propertyID,
  owner, 
  streetAddress, 
  city, 
  state, 
  zipCode, 
  basePrice, 
  cleaningPrice, 
  servicePrice, 
  maxduration, 
  lastreservationdate
) from '/Users/kevin_ong/HackReactor/SDC/calendar/db/properties_cassandra.csv' 
with DELIMITER=',' 
and header=false;

COPY reservations (
  reservationID,
  propertyID,
  userID,
  reservationStart,
  reservationEnd,
  adults,
  children,
  infants
) from '/Users/kevin_ong/HackReactor/SDC/calendar/db/reservations_cassandra.csv' 
with DELIMITER=',' 
and header=false;

COPY users (
  userid,
  firstName,
  lastName
) from '/Users/kevin_ong/HackReactor/SDC/calendar/db/users_cassandra.csv' 
with DELIMITER=',' 
and header=false;

-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000001, 2938741, 23985, 'start1', 'end1', 1, 1, 1);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000002, 349872, 902687, 'start2', 'end2', 2, 2, 2);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000003, 221, 233655, 'start3', 'end3', 3, 3, 3);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000004, 18990033, 23, 'start4', 'end4', 4, 4, 4);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000005, 17692834, 987655, 'start5', 'end5', 5, 5, 5);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000006, 14002939, 692873, 'start6', 'end6', 6, 6, 6);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000007, 7892634, 418736, 'start7', 'end7', 7, 7, 7);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000008, 4238768, 688776, 'start8', 'end8', 8, 8, 8);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000009, 10000382, 792754, 'start9', 'end9', 9, 9, 9);
-- insert into reservations(reservationID, propertyID, userID, reservationStart, reservationEnd, adults, children, infants) values(20000010, 15098374, 300048, 'start10', 'end10', 10, 10, 10);

-- update reservations set adults = 10, children = 10, infants = 10 where reservationID = 20000001;
-- update reservations set adults = 9, children = 9, infants = 9 where reservationID = 20000002;
-- update reservations set adults = 8, children = 8, infants = 8 where reservationID = 20000003;
-- update reservations set adults = 7, children = 7, infants = 7 where reservationID = 20000004;
-- update reservations set adults = 6, children = 6, infants = 6 where reservationID = 20000005;
-- update reservations set adults = 5, children = 5, infants = 5 where reservationID = 20000006;
-- update reservations set adults = 4, children = 4, infants = 4 where reservationID = 20000007;
-- update reservations set adults = 3, children = 3, infants = 3 where reservationID = 20000008;
-- update reservations set adults = 2, children = 2, infants = 2 where reservationID = 20000009;
-- update reservations set adults = 1, children = 1, infants = 1 where reservationID = 20000010;

-- delete from reservations where reservationID = 20000001;
-- delete from reservations where reservationID = 20000002;
-- delete from reservations where reservationID = 20000003;
-- delete from reservations where reservationID = 20000004;
-- delete from reservations where reservationID = 20000005;
-- delete from reservations where reservationID = 20000006;
-- delete from reservations where reservationID = 20000007;
-- delete from reservations where reservationID = 20000008;
-- delete from reservations where reservationID = 20000009;
-- delete from reservations where reservationID = 20000010;