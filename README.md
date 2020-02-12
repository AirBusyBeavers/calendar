# Calendar component of the DraftBnB listings page

API Documentation
______________________________________________________________________
GET /reservations
- BEHAVIOR
  - retrieves stored reservations for a specified property
- INPUT PARAMETERS
  - propID (type NUMBER): unique property identifier
- OUTPUT
  - an array of objects with reservation start and end Dates
  - returns an empty array if no reservations have been made

Example input: 
  { \n
    propID: 1234567890, \n
  } 

Example output: 
{
  [{
    resStart: someDate1, \n
    resEnd: anotherDate1, \n
  },
  {
    resStart: someDate2, \n
    resEnd: anotherDate2, \n
  },
  {
    resStart: someDate3, \n
    resEnd: anotherDate3, \n
  }]
}
______________________________________________________________________
POST /makeRes
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
  - resID (type NUMBER): unique reservation ID that is cached locally for faster update/delete access

Example input: 

  {

    propID: 1234567890,

    userID: 0987654321,

    resStart: Date1,

    resEnd: Date2,

    adults: 2,

    children: 3,

    infants: 0

  }

Example output:

  {

    resID: 24680

  }
______________________________________________________________________
PUT /updateRes
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
  - resID: same as above

Example input: 

  {

    resID: 24680

    resStart: Date1,

    resEnd: Date2,

    infants: 1

  }

Example output:

  {

    resID: 24680

  }
______________________________________________________________________
DELETE /deleteRes
- BEHAVIOR
  - given a resID, deletes associated record from database
- INPUT
  - resID (type NUMBER): unique reservation identifier
- OUTPUT
  - (none)

Example input:

  {

    resID: 24680

  }