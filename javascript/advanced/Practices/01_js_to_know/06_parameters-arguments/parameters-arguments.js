//
var yearOfBirth = 1990;

function callAge(year) {
  // `year` được xem là parameters
  return 2025 - year;
}

var age = callAge(yearOfBirth); // `yearOfBirth` được xem là arguments
