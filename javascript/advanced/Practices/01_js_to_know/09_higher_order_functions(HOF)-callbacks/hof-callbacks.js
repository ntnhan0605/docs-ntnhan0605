//

function cloneArrayAndDoSomething(arrInput, func) {
  var arrOutput = [];
  for (var idx = 0; idx < arrInput.length; idx++) {
    arrOutput.push(func(arrInput[idx]));
  }
  return arrOutput;
}

const arr = [2, 4, 8];

const handleAdd3 = function (number) {
  return number + 3;
};

const result = cloneArrayAndDoSomething(arr, handleAdd3); // [5, 7, 11]
// `cloneArrayAndDoSomething` is HOF
// `handleAdd3` is callbacks function
