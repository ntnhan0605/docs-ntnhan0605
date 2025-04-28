function getArrayFromString(str) {
  return str.split(' ').map(Number);
}

const arrayStr = `1 2 5 3 7 8 6 4`;
// const arrayStr = `1 2 3 4 5`;
const arr = getArrayFromString(arrayStr);

function minimumBribes(q) {
  // Write your code here
  let bribes = 0;
  let newQ = [...q];

  function minimumBribesItem(i, q) {
    if (i === q[i] - 1) {
      return q;
    }

    const value = i + 1;
    const indexValue = q.findIndex((val) => val === value);

    return q;
  }

  for (let i = newQ.length - 1; i >= 0; i--) {
    newQ = minimumBribesItem(i, newQ);
  }
}

console.log(minimumBribes(arr));
