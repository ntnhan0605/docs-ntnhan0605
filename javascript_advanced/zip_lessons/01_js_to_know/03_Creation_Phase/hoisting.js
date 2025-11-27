// console.log('1. age=', age)
// console.log('2. fullName=', fullName)
// console.log('3. yearOfBirth=', yearOfBirth)
// debugger;

var age = 20;
let firstName = 'Lực';
let lastName = 'Trần Công';
const yearOfBirth = 1990;

// Function Declaration
function calAge(year) {
  return 2021 - year;
}

// Function Expression
var getFullName = function() {
  return lastName + ' ' + firstName
}