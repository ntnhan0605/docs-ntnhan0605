//
console.log('1. age - ', age); // 1. age - undefined
var age = 30;
console.log('2. age - ', age); // 2. age - 30

let firstName = 'Nhân';
let lastName = 'Nguyễn Thiện';
const yearOfBirth = 1994;

console.log('3. callAge - ', callAge(yearOfBirth)); // 3. callAge - 31  No error
function callAge(yearOfBirth) {
  return 2025 - yearOfBirth;
}
console.log('4. callAge - ', callAge(yearOfBirth)); // 4. callAge - 31  No error

console.log('5. getFullName - ', getFullName()); // Error
var getFullName = function () {
  return lastName + ' ' + firstName;
};
console.log('6. getFullName - ', getFullName());
