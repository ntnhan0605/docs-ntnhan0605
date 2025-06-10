//
// function sum(number1) {
//   function innerFunc(number2) {
//     return number2 + number1;
//   }

//   return innerFunc;
// }

function sum(number1) {
  return (number2) => {
    return number2 + number1;
  };
}

const total = sum(10)(20);
