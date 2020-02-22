const faker = require('faker');
const createWriter = require('csv-writer').createArrayCsvWriter;
const path = require('path');

const random = (val) => {
  return Math.round(Math.random() * val);
};

const dateBlockGenerator = () => {
  let start = new Date();
  const ms = Date.parse(start);
  const excess = ms % 86400000;
  start = new Date(ms - excess);
  start.setUTCDate(start.getUTCDate() + random(16));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + random(14));
  return [start.toISOString(), end.toISOString()];
};

const userArrayGenerator = () => {
  return [
    faker.name.firstName(),
    faker.name.lastName(),
  ];
};

const cassandraUserGenerator = (userID) => {
  return [
    userID,
    faker.name.firstName(),
    faker.name.lastName(),
  ];
};

const daysOut = [30, 60, 90];
const propertyArrayGenerator = (userID) => {
  return [
    userID, 
    faker.address.streetAddress(), 
    faker.address.city(), 
    faker.address.stateAbbr(), 
    faker.address.zipCode(), 
    random(150) + 15, 
    random(15) + 10, 
    random(15) + 5, 
    random(21 + 7), 
    daysOut[random(2)]
  ];
};

const cassandraPropertyGenerator = (propertyID, userID) => {
  return [
    reservationID,
    propertyID,
    userID,
    faker.address.streetAddress(), 
    faker.address.city(), 
    faker.address.stateAbbr(), 
    faker.address.zipCode(), 
    random(150) + 15, 
    random(15) + 10, 
    random(15) + 5, 
    random(21 + 7), 
    daysOut[random(2)]
  ];
};

const reservationArrayGenerator = (propertyID, userID) => {
  const dates = dateBlockGenerator();

  return [
    propertyID, 
    userID, 
    dates[0], 
    dates[1], 
    random(10) + 1, 
    random(6), 
    random(3)
  ];
};

const cassandraReservationGenerator = (reservationID, propertyID, userID) => {
  const dates = dateBlockGenerator();

  return [
    reservationID,
    propertyID, 
    userID, 
    dates[0], 
    dates[1], 
    random(10) + 1, 
    random(6), 
    random(3)
  ];
};

const userWriter = createWriter({
  path: 'users.csv',
  header: [
    'firstName',
    'lastName',
  ],
  append: true,
});

const cassandraUserWriter = createWriter({
  path: 'users_cassandra.csv',
  header: [
    'userID',
    'firstName',
    'lastName'
  ],
  append: true
});

const propertyWriter = createWriter({
  path: './properties.csv',
  header: [
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
  ],
  append: true,
});

const cassandraPropertyWriter = createWriter({
  path: 'properties_cassandra.csv',
  header: [
    'propertyID',
    'userID',
    'streetAddress',
    'city',
    'state',
    'zipCode',
    'basePrice',
    'cleaningPrice',
    'servicePrice',
    'maxDuration',
    'lastReservationDate'
  ],
  append: true
});

const reservationWriter = createWriter({
  path: 'reservations.csv',
  header: [
    'userID',
    'propertyID',
    'start',
    'end',
    'adults',
    'children',
    'infants',
  ],
  append: true,
});

const cassandraReservationWriter = createWriter({
  path: 'reservations_cassandra.csv',
  header: [
    'reservationID',
    'userID',
    'propertyID',
    'start',
    'end',
    'adults',
    'children',
    'infants',
  ],
  append: true,
});

// create users.csv
const seedUsers = () => {
  console.log('Started at:', new Date())
  let userCount = 1;
  let users = [];
  while (userCount <= 1000000) {
    users.push(userArrayGenerator());
    userCount++;
  }

  console.log('Finished creating array at:', new Date());

  let batchCount = 0;
  const totalBatches = userCount / 1000000;

  while (batchCount < totalBatches) {
    let userBatch = users.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    userWriter.writeRecords(userBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

const seedCassandraUsers = () => {
  console.log('Started at:', new Date())
  let userCount = 1;
  let users = [];
  while (userCount <= 1000000) {
    users.push(cassandraUserGenerator(userCount));
    userCount++;
  }

  console.log('Finished creating array at:', new Date());

  let batchCount = 0;
  const totalBatches = userCount / 1000000;

  while (batchCount < totalBatches) {
    let userBatch = users.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    cassandraUserWriter.writeRecords(userBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

// Create properties.csv
const seedProperties = () => {
  console.log('Started at ', new Date());

  let propertyCount = 1;
  let properties = [];

  while (propertyCount <= 10000000) {
    const user = Math.max(random(1000000), 1);
    properties.push(propertyArrayGenerator(user));
    propertyCount++;
  }

  console.log('Finished creating array at:', new Date());
  let batchCount = 0;
  const totalBatches = propertyCount / 1000000;

  while (batchCount < totalBatches) {
    let propertyBatch = properties.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    propertyWriter.writeRecords(propertyBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

const seedCassandraProperties = () => {
  console.log('Started at ', new Date());

  let propertyCount = 1;
  let properties = [];

  while (propertyCount <= 10000000) {
    const userID = Math.max(random(1000000), 1);
    properties.push(cassandraPropertyGenerator(propertyCount, userID));
    propertyCount++;
  }

  console.log('Finished creating array at:', new Date());
  let batchCount = 0;
  const totalBatches = propertyCount / 1000000;

  while (batchCount < totalBatches) {
    let propertyBatch = properties.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    cassandraPropertyWriter.writeRecords(propertyBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

// Create reservations.csv
const seedReservations = () => {
  console.log('Started at:', new Date());

  let reservationCount = 1;
  let reservations = [];
  while (reservationCount <= 20000000) {
    const user = Math.max(random(1000000), 1);
    const property = Math.max(random(10000000), 1);
    reservations.push(reservationArrayGenerator(property, user));
    reservationCount++;
  }
  console.log('Finished creating array at:', new Date());
  let batchCount = 0;
  const totalBatches = reservationCount / 1000000;

  while (batchCount < totalBatches) {
    let reservationBatch = reservations.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    reservationWriter.writeRecords(reservationBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

const seedCassandraReservations = () => {
  console.log('Started at:', new Date());

  let reservationCount = 1;
  let reservations = [];
  while (reservationCount <= 20000000) {
    const userID = Math.max(random(1000000), 1);
    const propertyID = Math.max(random(10000000), 1);
    reservations.push(cassandraReservationGenerator(reservationCount, propertyID, userID));
    reservationCount++;
  }
  console.log('Finished creating array at:', new Date());
  let batchCount = 0;
  const totalBatches = reservationCount / 1000000;

  while (batchCount < totalBatches) {
    let reservationBatch = reservations.slice(batchCount * 1000000, (batchCount + 1) * 1000000);
    cassandraReservationWriter.writeRecords(reservationBatch)
      .catch((err) => {
        console.log('Error writing batch:', batchCount);
      });
    batchCount++;
  }

  console.log('Done at:', new Date());
};

// Postgres csv generators
// seedUsers();
// seedProperties();
// seedReservations();

// Cassandra csv generators
// seedCassandraUsers();
// seedCassandraProperties();
// seedCassandraReservations();

// seeding scripts
// node --max-old-space-size=8192 db/seed.js 