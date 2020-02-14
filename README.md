# Calendar component of the DraftBnB listings page

## API
______________________________________________________________________
### GET /reservations/:resID
- BEHAVIOR
  - retrieves stored reservations for a specified property
- INPUT PARAMETERS
  - propID (type NUMBER): unique property identifier
- OUTPUT
  - an array of objects with reservation start and end Dates
  - returns an empty array if no reservations have been made

Example input:
```javascript
  {
    propID: 1234567890,
  } 
```

Example output:
```javascript
  {
    [{
      resStart: someDate1,
      resEnd: anotherDate1,
    },
    {
      resStart: someDate2,
      resEnd: anotherDate2,
    },
    {
      resStart: someDate3,
      resEnd: anotherDate3,
    }]
  }
```
______________________________________________________________________
### POST /reservations/
- BEHAVIOR
  - stores submitted reservation parameters as a database entry
- INPUT PARAMETERS
  - propID (type NUMBER): unique property identifier
  - userID (type NUMBER): unique user identifier
  - resStart (type DATE): start date of reservation
  - resEnd (type DATE): end date of reservation
  - count (type OBJECT): object containing the number of adults, children, and infants
    - adults (type NUMBER): number of adults
    - children (type NUMBER): number of children
    - infants (type NUMBER): number of infants
- OUTPUT
  - resID (type NUMBER): unique reservation ID of the newly created reservation

Example input: 
```javascript
  {
    propID: 1234567890,
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
  {
    resID: 24680
  }
```
______________________________________________________________________
### PUT /reservations/:resID
- BEHAVIOR
  - given a resID, updates the stored record matching the resID with any additional parameters passed
- INPUT
  - resID (type NUMBER): unique reservation ID that is cached locally for faster update/delete access
  - resStart (OPTIONAL, type DATEOPTIONAL, ): start date of reservation
  - resEnd (OPTIONAL, type DATE): end date of reservation
  - adults (OPTIONAL, type NUMBER): number of adults
  - children (OPTIONAL, type NUMBER): number of children
  - infants (OPTIONAL, type NUMBER): number of infants
- OUTPUT
  - none

Example input: 
```javascript
  {
    resID: 24680
    resStart: Date1,
    resEnd: Date2,
    infants: 1
  }
```
______________________________________________________________________
### DELETE /reservations/:resID
- BEHAVIOR
  - given a resID, deletes associated record from database
- INPUT
  - resID (type NUMBER): unique reservation identifier
- OUTPUT
  - none

Example input:
```javascript
  {
    resID: 24680
  }
```
______________________________________________________________________
### GET /users/:userID
- BEHAVIOR
  - retrieves user information for a given userID
- INPUT PARAMETERS
  - userID (type NUMBER): unique user identifier
- OUTPUT
  - an object with stored user data

Example input:
```javascript
  {
    userID: 24680,
  } 
```

Example output:
```javascript
  {
    firstName: Fred,
    lastName: George,
    listings: ['123141', '129348']
  }
```
______________________________________________________________________
### POST /users/
- BEHAVIOR
  - stores a new user entry into USERS table
- INPUT PARAMETERS
  - firstName (type STRING): user first name
  - lastName (type STRING): user last name
  - listings (type ARRAY of STRINGS, DEFAULT []): array containing propIDs associated with the user
- OUTPUT
  - userID (type NUMBER): unique user ID of newly created entry

Example input: 
```javascript
  {
    firstName: Fred,
    lastName: George,
  }
```

Example output:
```javascript
  {
    userID: 24680
  }
```
______________________________________________________________________
### PUT /users/:userID
- BEHAVIOR
  - given a userID, updates the stored record matching the userID with the passed parameters
- INPUT
  - userID (type NUMBER): unique user ID
  - firstName (OPTIONAL, type DATE): user first name
  - lastName (OPTIONAL, type DATE): user last name
  - listings (OPTIONAL, type ARRAY of STRINGS): array containing propIDs associated with the user
- OUTPUT
  - none

Example input: 
```javascript
  {
    userID: 24680
    firstName: Fred,
    lastName: George,
  }
```
______________________________________________________________________
### DELETE /users/:userID
- BEHAVIOR
  - given a userID, deletes associated record from USERS table
- INPUT
  - userID (type NUMBER): unique reservation identifier
- OUTPUT
  - none

Example input:
```javascript
  {
    userID: 24680
  }
```
______________________________________________________________________
### GET /properties/:propID
- BEHAVIOR
  - retrieves property information for property with the propID
- INPUT PARAMETERS
  - propID (type NUMBER): unique property identifier
- OUTPUT
  - an object with the properties address, pricing info, 
    and how many days from the current day a user may make a reservation

Example input:
```javascript
  {
    propID: 24680,
  } 
```

Example output:
```javascript
  {
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
- INPUT PARAMETERS
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
- OUTPUT
  - propID (type NUMBER): unique property ID of newly created entry

Example input: 
```javascript
  {
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
  {
    propID: 24680
  }
```
______________________________________________________________________
### PUT /properties/:propID
- BEHAVIOR
  - given a propID, updates the stored record matching the propID with passed parameters
  - if a field stores data within an object, all properties (changed and unchanged) of that object must be provided
- INPUT
  - propID (type NUMBER): unique property ID
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
- OUTPUT
  - none

Example input: 
```javascript
  {
    propID: 24680,
    address: {
      streetAddress: '1234 Hackreactor Plaza',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '12345'
    }
  }
```
______________________________________________________________________
### DELETE /properties/:propID
- BEHAVIOR
  - given a propID, deletes associated record from PROPERTIES table
- INPUT
  - propID (type NUMBER): unique property identifier
- OUTPUT
  - none

Example input:
```javascript
  {
    propID: 24680
  }
```