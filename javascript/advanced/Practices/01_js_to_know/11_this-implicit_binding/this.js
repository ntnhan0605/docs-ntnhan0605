//
var join = {
  age: 30,
  callAge() {
    console.log('callAge', this);
  },
};

// Alias - Bí danh
join.callAge(); // dot notation -> Implicit Binding

// Alias - func
var func = join.callAge;
func(); // Không dùng từ khóa `this` : Default Binding

// ==> Mỗi lần gọi hàm khác nhau sẽ nhận được biến this khác nhau

function test() {
  // Default Binding
  // 'use strict';
  console.log(this, this === window, this === globalThis);
}
test();

function getThisStrict() {
  'use strict'; // Enter strict mode
  return this;
}
// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThisStrict = getThisStrict;
console.log(typeof (1).getThisStrict()); // "number"

function logThis() {
  'use strict';
  console.log(this);
}
[1, 2, 3].forEach(logThis); // undefined, undefined, undefined

const obj4 = {
  name: 'obj4',
  getThis() {
    return this;
  },
};
const obj5 = { name: 'obj5' };
obj5.getThis = obj4.getThis;
console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }

const globalObject = this;
const foo = () => {
  'use strict';
  return this;
};
console.log(foo() === globalObject); // true

const obj = { name: 'obj' };

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalObject); // true
