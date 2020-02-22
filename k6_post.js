import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 500,
  rps: 5000,
  iterations: 500000
  // duration: "120s"
};

export default function() {
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

  const dates = dateBlockGenerator();

  let res = http.request('POST', "http://localhost:3001/reservations", {
    propertyID: Math.ceil(Math.random(10000000)),
    userID: Math.ceil(Math.random(1000000)),
    reservationStart: dates[0],
    reservationEnd: dates[1],
    adults: Math.round(Math.random(10) + 1),
    children: Math.round(Math.random(7)),
    infants: Math.round(Math.random(3))
  });
  check(res, {
    "status was not 500": (r) => r.status != 500,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
  sleep(.005);
};