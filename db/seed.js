const faker = require('faker');
const createWriter = require('csv-writer').createObjectCsvWriter;
const sha = require('crypto-js/sha256');
const path = require('path');

const random = (val) => {
  return Math.round(Math.random() * val);
}

const hasher = (arr) => {
  let str = '';

  arr.forEach(entry => {
    str += entry;
  });

  return sha(str).toString();
}

const dateBlockGenerator = () => {
  const today = Math.floor(Date.now() / 864000000);
  const start = random(7) + today;
  const end = random(9) + start;
  return [start, end];
}

const userGenerator = (userID) => {

  let properties = [];
  for (var i = 0; i < random(2); i++) {
    properties.push(random(10000000).toString());
  }

  const user = {
    userID: userID,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };

  return user;
}

const propertyGenerator = (userID, propertyID) => {
  let property = {
    propertyID: propertyID,
    owner: userID,
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
    basePrice: random(150) + 15,
    cleaningPrice: random(15) + 10,
    servicePrice: random(15) + 5,
    maxDuration: random(21) + 7,
    lastReservationDate: daysOut[random(2)],
  };

  return property;
}

const daysOut = [30, 60, 90];
const reservationGenerator = (reservationID, propertyID, userID) => {
  const dates = dateBlockGenerator();

  let reservation = {
    reservationID: reservationID,
    userID: userID,
    propertyID: propertyID,
    start: dates[0],
    end: dates[1],
    adults: random(10) + 1, // minimum of 1 adult
    children: random(6),
    infants: random(3),
  };

  return reservation;
};

const userWriter = createWriter({
  path: 'users.csv',
  header: [
    'userID',
    'firstName',
    'lastName',
  ]
});

const propertyWriter = createWriter({
  path: './properties.csv',
  header: [
    'propertyID',
    'owner',
    'streetAddress',
    'city',
    'state',
    'zipCode',
    'basePrice',
    'cleaningPrice',
    'servicePrice',
    'maxDuration',
    'lastReservationDate'
  ]
});

const reservationWriter = createWriter({
  path: './reservation.csv',
  header: [
    'reservationID',
    'userID',
    'propertyID',
    'start',
    'end',
    'adults',
    'children',
    'infants',
  ]
});

// create users.csv
const seedUsers = () => {
  const startTime = new Date();
  console.log('Started at ', startTime)
  let userCount = 1;
  let users = [];
  while (userCount <= 1000000) {
    users.push(userGenerator(userCount));
    userCount++;
  }
  userWriter.writeRecords(users)
    .then(() => {
      const endTime = new Date();
      console.log('Done at ', endTime);
      return;
    });
}

// Create properties.csv
const seedProperties = () => {
  const startTime = new Date();
  console.log('Started at ', startTime);

  let propertyCount = 1;
  let properties = [];

  while (propertyCount <= 10000000) {
    const user = random(1000000);
    properties.push(propertyGenerator(user, propertyCount));
    propertyCount++;
  }
  propertyWriter.writeRecords(properties)
    .then(() => {
      const endTime = new Date();
      console.log('Done at ', endTime);
    });
}

// Create properties.csv
const seedReservations = () => {
  const startTime = new Date();
  console.log('Started at ', startTime);

  let reservationCount = 1;
  let reservations = [];
  while (reservationCount <= 2000000) {
    const user = random(1000000);
    const property = random(10000000);
    reservations.push(reservationGenerator(reservationCount, property, user));
    reservationCount++;
  }
  reservationWriter.writeRecords(reservations)
    .then(() => {
      const endTime = new Date();
      console.log('Done at ', endTime);
    });
}

seedUsers();
seedProperties();
seedReservations();
