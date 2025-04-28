console.log('1. age = ', age);
var age = 20;
console.log('2. age = ', age);

let firstName = 'Lực';
let lastName = 'Trần Công';
const yearOfBirth = 1990;

console.log('3. calAge()', calAge(yearOfBirth));
function calAge(year) {
  return 2021 - year;
}
console.log('4. calAge()', calAge(yearOfBirth));

console.log('5. getFullName()', getFullName());
var getFullName = function() {
  return lastName + ' ' + firstName
}
console.log('6. getFullName()', getFullName());