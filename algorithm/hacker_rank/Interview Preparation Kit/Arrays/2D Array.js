function hourglassSum(arr) {
  // Write your code here
  let max = -9999;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const a = arr[i][j];
      const b = arr[i][j + 1];
      const c = arr[i][j + 2];
      const d = arr[i + 1] ? arr[i + 1][j + 1] : undefined;
      const e = arr[i + 2] ? arr[i + 2][j] : undefined;
      const f = arr[i + 2] ? arr[i + 2][j + 1] : undefined;
      const g = arr[i + 2] ? arr[i + 2][j + 2] : undefined;

      if ([a, b, c, d, e, f, g].every((val) => typeof val !== 'undefined')) {
        const sum = a + b + c + d + e + f + g;
        if (sum > max) {
          max = sum;
        }
      }
    }
  }
  return max;
}

const arrayStr = `-1 -1 0 -9 -2 -2
-2 -1 -6 -8 -2 -5
-1 -1 -1 -2 -3 -4
-1 -9 -2 -4 -4 -5
-7 -3 -3 -2 -9 -9
-1 -3 -1 -2 -4 -5`;
// const arrayStr = `1 1 1 0 0 0
// 0 1 0 0 0 0
// 1 1 1 0 0 0
// 0 9 2 -4 -4 0
// 0 0 0 -2 0 0
// 0 0 -1 -2 -4 0`;
// const arrayStr = `1 1 1 0 0 0
// 0 1 0 0 0 0
// 1 1 1 0 0 0
// 0 0 2 4 4 0
// 0 0 0 2 0 0
// 0 0 1 2 4 0`;
// const arrayStr = `1 1 1 0 0 0
// 0 1 0 0 0 0
// 1 1 1 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0`;

function getArrayFromString(str) {
  return str.split('\n').map((str) => str.split(' ').map(Number));
}

const arr = getArrayFromString(arrayStr);
const sum = hourglassSum(arr);
console.log('** RYAN 2D Array.js 41 sum : ', sum);
