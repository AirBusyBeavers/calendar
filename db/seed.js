const faker = require('faker');
const json2csv = require('json-2-csv');
const sha = require('crypto-js/sha256');

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

const priceGenerator = () => {
  return {
    basePrice: random(150) + 15,
    cleaningPrice: random(20),
    servicePrice: random(20),
  };
}

const headCountGenerator = () => {
  return random(10);
}

const dateBlockGenerator = () => {
  const today = Math.floor(Date.now() / 864000000);
  const start = random(7) + today;
  const end = random(9) + start;
  return [start, end];
}

const propertyGenerator = () => {
  let property = {
    address: {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipcode: faker.address.zipCode(),
    },
    pricingInfo: priceGenerator(),
    maxReservationDate: random(60) + 30,
  };

  // Extracts property information to construct full address before
  // passing to hasher.
  const hash = hasher(Object.values(property).slice(0, 4));
  property.propID = hash;

  return property;
}

const userGenerator = (properties = []) => {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    properties,
  };

  const hash = hasher(Object.values(user));
  user.userID = hash;

  return user;
}

const reservationGenerator = (propID, userID) => {
  const dates = dateBlockGenerator();

  let reservation = {
    userID,
    propID,
    start: dates[0],
    end: dates[1],
    adults: headCountGenerator() + 1, // minimum of 1 adult
    children: headCountGenerator(),
    infants: headCountGenerator(),
  };

  return reservation;
}

const csvGenerator = (array) => {

}

console.log(propertyGenerator());
console.log(reservationGenerator());