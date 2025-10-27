const d = 4;
const arrStr = `1 2 3 4 5`;

function getArrayFromString(str) {
  return str.split(' ').map(Number);
}

const arr = getArrayFromString(arrStr);

console.log('** RYAN Left Rotation.js 10 arr : ', arr);

function rotLeft(a, d) {
  const arrLeft = a.slice(0, d);
  const arrRight = a.slice(d);
  return arrRight.concat(arrLeft);
}

console.log(rotLeft(arr, d));
