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

const propertyGenerator = (propertyID) => {
  let property = {
    propertyID: propertyID,
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

const userGenerator = (userID) => {

  let properties = [];
  for (var i = 0; i < random(2); i++) {
    properties.push(random(10000000).toString());
  }

  const user = {
    userID: userID,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    properties: properties,
  };

  return user;
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
    {id: 'userID', title: 'User ID'},
    {id: 'firstName', title: 'First Name'},
    {id: 'lastName', title: 'Last Name'},
    {id: 'properties', title: 'Properties'},
  ]
});

const propertyWriter = createWriter({
  path: './properties.csv',
  header: [
    {id: 'propertyID', title: 'Property ID'},
    {id: 'streetAddress', title: 'Street Address'},
    {id: 'city', title: 'City'},
    {id: 'state', title: 'State (abbr.)'},
    {id: 'zipCode', title: 'Zipcode'},
    {id: 'basePrice', title: 'Base Price'},
    {id: 'cleaningPrice', title: 'Cleaning Price'},
    {id: 'servicePrice', title: 'Service Price'},
    {id: 'maxDuration', title: 'Maximum Duration'},
    {id: 'lastReservationDate', title: 'Furthest Number of Days for Valid Reservation'}
  ]
});

const reservationWriter = createWriter({
  path: './reservation.csv',
  header: [
    {id: 'reservationID', title: 'Reservation ID'},
    {id: 'userID', title: 'User ID'},
    {id: 'propertyID', title: 'Property ID'},
    {id: 'start', title: 'Reservation Start Date'},
    {id: 'end', title: 'Reservation End Date'},
    {id: 'adults', title: 'Number of Adults'},
    {id: 'children', title: 'Number of Children'},
    {id: 'infants', title: 'Number of Infants'},
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
  console.log('Started at ', startTime)
  let propertyCount = 1;
  let properties = [];
  while (propertyCount <= 10000000) {
    properties.push(propertyGenerator(propertyCount));
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

// seedUsers();
// seedProperties();
// seedReservations();
