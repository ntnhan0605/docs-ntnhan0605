//
var join = {
  year: 1994,
  sum: function (x, y) {
    console.log('x = ', x, '; y = ', y);
    console.log('sum', this);
    console.log('---------------');
    return x + y;
  },
};

const value1 = join.sum(20, 10);
const value2 = join.sum.bind({ name: 'Nhan 2' });
const value3 = join.sum.call({ name: 'Nhan 3' }, 10, 25);
const value4 = join.sum.apply({ name: 'Nhan 4' }, [10, 40]);

console.log(value1);
console.log(value2);
console.log(value3);
console.log(value4);
