const n = 8,
  k = 3;
const arr = [1, 1, 2, 2, 3, 3, 4, 5];
function array(arr, n, k) {
  count = new Array(n).fill(0);
  unique = 0;
  for (let i = 0; i < n; i++) {
    if (count[arr[i]] == 0) {
      unique++;
    }
    count[arr[i]] += 1;
    if (unique == k) {
      j = 0;
      while (true) {
        if (count[arr[j]] > 1) {
          count[arr[j]] -= 1;
          j += 1;
        } else {
          return `${j + 1} ${i + 1}`;
        }
      }
    }
  }
  return '-1 -1';
}

console.log(array(arr, n, k));

/**
 * 
const arr1 = [[1, 2, 3], 4, [[5]]];
function flatten(x) {
  // if (Array.isArray(x)) {
  //   const newArr = [];
  //   for (let i = 0; i < x.length; i++) {
  //     const xi = x[i];
  //     if (Array.isArray(xi)) {
  //       flatten(xi).map((k) => newArr.push(k));
  //     } else {
  //       newArr.push(xi);
  //     }
  //   }
  //   return newArr;
  // }
  // return x;

  if (Array.isArray(x)) {
    return x.reduce((total, i) => {
      if (Array.isArray(i)) {
        flatten(i).map((x) => total.push(x));
      } else {
        total.push(i);
      }
      return total;
    }, []);
  }

  return x;
}

console.log(flatten(arr1));
*/
