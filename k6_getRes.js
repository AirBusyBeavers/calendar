import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "60s"
};

export default function() {
  let res = http.request('GET', `http://localhost:3001/reservations/${Math.round(Math.random() * 20000000)}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
  sleep(.005);
};