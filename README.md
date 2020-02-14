# Calendar component of the DraftBnB listings page

## API
______________________________________________________________________
### GET /reservations/:propertyID
- BEHAVIOR
  - retrieves stored reservations for a specified property
- REQUEST BODY
  - propertyID (type NUMBER): unique property identifier
- RESPONSE
  - an array of objects with reservation start and end Dates
  - returns an empty array if no reservations have been made

Example input:
```javascript
  req.body = {
    propertyID: 1234567890,
  } 
```

Example output:
```javascript
  response = [
    {
      start: someDate1,
      end: anotherDate1,
    },
    {
      start: someDate2,
      end: anotherDate2,
    },
    {
      start: someDate3,
      end: anotherDate3,
    }
  ]
```
______________________________________________________________________
### POST /reservations/
- BEHAVIOR
  - stores submitted reservation parameters in RESERVATIONS table
- REQUEST BODY
  - propertyID (type NUMBER): unique property identifier
  - userID (type NUMBER): unique user identifier
  - start (type DATE): start date of reservation
  - end (type DATE): end date of reservation
  - adults (type NUMBER): number of adults
  - children (type NUMBER): number of children
  - infants (type NUMBER): number of infants
- RESPONSE
  - reservationID (type NUMBER): unique reservation ID of the newly created reservation

Example input: 
```javascript
  req.body = {
    propertyID: 1234567890,
    userID: 0987654321,
    resStart: Date1,
    resEnd: Date2,
    adults: 2,
    children: 3,
    infants: 0
  }
```

Example output:
```javascript
  response = {
    reservationID: 24680
  }
```
______________________________________________________________________
### PUT /reservations/:reservationID
- BEHAVIOR
  - given a reservation ID, updates the stored record matching the reservationID with any additional parameters passed
- REQUEST BODY
  - reservation ID (type NUMBER): unique reservation ID that is cached locally for faster update/delete access
  - start (OPTIONAL, type DATEOPTIONAL, ): start date of reservation
  - end (OPTIONAL, type DATE): end date of reservation
  - adults (OPTIONAL, type NUMBER): number of adults
  - children (OPTIONAL, type NUMBER): number of children
  - infants (OPTIONAL, type NUMBER): number of infants
- RESPONSE
  - none

Example input: 
```javascript
  req.body = {
    reservationID: 24680
    resStart: Date1,
    resEnd: Date2,
    infants: 1
  }
```
______________________________________________________________________
### DELETE /reservations/:reservationID
- BEHAVIOR
  - deletes record with given reservationID from database
- REQUEST BODY
  - reservationID (type NUMBER): unique reservation identifier
- RESPONSE
  - none

Example input:
```javascript
  req.body = {
    reservationID: 24680
  }
```
______________________________________________________________________
### GET /users/:userID
- BEHAVIOR
  - retrieves a single user's information for a given userID
- REQUEST BODY
  - userID (type NUMBER): unique user identifier
- RESPONSE
  - an object with stored user data

Example input:
```javascript
  req.body = {
    userID: 24680,
  } 
```

Example output:
```javascript
  response = {
    firstName: Fred,
    lastName: George,
    listings: ['123141', '129348']
  }
```
______________________________________________________________________
### POST /users/
- BEHAVIOR
  - stores a new user entry into USERS table
- REQUEST BODY
  - firstName (type STRING): user first name
  - lastName (type STRING): user last name
  - listings (type ARRAY of STRINGS, DEFAULT []): array containing propertyIDs associated with the user
- RESPONSE
  - userID (type NUMBER): unique user ID of newly created entry

Example input: 
```javascript
  req.body = {
    firstName: Fred,
    lastName: George,
  }
```

Example output:
```javascript
  response = {
    userID: 24680
  }
```
______________________________________________________________________
### PUT /users/:userID
- BEHAVIOR
  - given a userID, updates the stored record matching the userID with the passed parameters
- REQUEST BODY
  - userID (type NUMBER): unique user ID
  - firstName (OPTIONAL, type DATE): user first name
  - lastName (OPTIONAL, type DATE): user last name
  - listings (OPTIONAL, type ARRAY of STRINGS): array containing propertyIDs associated with the user
- RESPONSE
  - none

Example input: 
```javascript
  req.body = {
    userID: 24680
    firstName: Fred,
    lastName: George,
  }
```
______________________________________________________________________
### DELETE /users/:userID
- BEHAVIOR
  - given a userID, deletes associated record from USERS table
- REQUEST BODY
  - userID (type NUMBER): unique reservation identifier
- RESPONSE
  - none

Example input:
```javascript
  req.body = {
    userID: 24680
  }
```
______________________________________________________________________
### GET /properties/:propertyID
- BEHAVIOR
  - retrieves property information for property with the propertyID
- REQUEST BODY
  - propertyID (type NUMBER): unique property identifier
- RESPONSE
  - an object with the properties address, pricing info, 
    and how many days from the current day a user may make a reservation

Example input:
```javascript
  req.body = {
    propertyID: 24680,
  } 
```

Example output:
```javascript
  response = {
    address: {
      streetAddress: '1234 Hackreactor Plaza',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '12345'
    },
    pricingInfo: {
      basePrice: 87,
      cleaningPrice: 15,
      servicePrice: 12
    },
    maxReservationDate: 60
  }
```
______________________________________________________________________
### POST /properties
- BEHAVIOR
  - stores submitted property parameters as a database entry in PROPERTIES table
- REQUEST BODY
  - address (OPTIONAL, type OBJECT):
    - streetAddress (type STRING)
    - city (type STRING)
    - state (type STRING)
    - zipCode (type STRING)
  - pricingInfo (OPTIONAL, type OBJECT):
    - basePrice (type NUMBER)
    - cleaningPrice (type NUMBER)
    - servicePrice (type NUMBER)
  - maxReservationDate (type NUMBER)
- RESPONSE
  - propertyID (type NUMBER): unique property ID of newly created entry

Example input: 
```javascript
  req.body = {
    address: {
      streetAddress: '1234 Hackreactor Plaza',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '12345'
    },
    pricingInfo: {
      basePrice: 87,
      cleaningPrice: 15,
      servicePrice: 12
    },
    maxReservationDate: 60
  }
```

Example output:
```javascript
  response = {
    propertyID: 24680
  }
```
______________________________________________________________________
### PUT /properties/:propertyID
- BEHAVIOR
  - given a propertyID, updates the stored record matching the propertyID with passed parameters
  - if a field stores data within an object, all properties (changed and unchanged) of that object must be provided
- REQUEST BODY
  - propertyID (type NUMBER): unique property ID
  - address (OPTIONAL, type OBJECT):
    - streetAddress (type STRING)
    - city (type STRING)
    - state (type STRING)
    - zipCode (type STRING)
  - pricingInfo (OPTIONAL, type OBJECT):
    - basePrice (type NUMBER)
    - cleaningPrice (type NUMBER)
    - servicePrice (type NUMBER)
  - maxReservationDate (type NUMBER)
- RESPONSE
  - none

Example input: 
```javascript
  req.body = {
    propertyID: 24680,
    address: {
      streetAddress: '1234 Hackreactor Plaza',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '12345'
    }
  }
```
______________________________________________________________________
### DELETE /properties/:propertyID
- BEHAVIOR
  - given a propertyID, deletes associated record from PROPERTIES table
- REQUEST BODY
  - propertyID (type NUMBER): unique property identifier
- RESPONSE
  - none

Example input:
```javascript
  req.body = {
    propertyID: 24680
  }
```