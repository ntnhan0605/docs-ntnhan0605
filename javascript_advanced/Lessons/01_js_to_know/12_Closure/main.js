
function cached() {
  let count = 0;

  return () => {
    debugger;
    count = count + 1;
    // console.log('this', this); debugger;
    return count;
  }
}

const func = cached();

const value1 = func();
console.log('value1', value1);
const value2 = func();
console.log('value2', value2);