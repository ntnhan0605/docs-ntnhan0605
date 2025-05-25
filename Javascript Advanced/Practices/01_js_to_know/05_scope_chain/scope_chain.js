//
var x = 10;

one();
function one() {
  var y = 5;

  two();
  function two() {
    var z = 15;

    three();
    function three() {
      var t = x + y + z;
      console.log('1. x + y + z = ', t); // 30
      four();
    }
  }
}

function four() {
  var t = 30;
  console.log('2. x = ', x); // 10 sử dụng tầm vực bên ngoài của nó và có x có giá trị
  console.log('3. y = ', y); // Error -> Dừng luôn chương trình
  console.log('4. z = ', z); // Error
  console.log('5. t = ', t); // 30
}

// Global Scope
// 1. Creation Phase - Global : x = undefined, one = func, four = func
// 2. Execution Phase - Global : x = 10, one = func, four = func

// Local Scope one func
// 1. Creation Phase - one : y = undefined, two = func && inherit Global Scope : x = 10, one = func, four = func
// 2. Execution Phase - y = 5, two = func & x = 10, one = func, four = func

// Local Scope two func
// 1. Creation Phase - two : z = undefined, three = func && inherit one func, global scope y = 5, two = func & x = 10, one = func, four = func
// 2. Execution Phase - two: z = 15, three = func & y = 5, two = func & x = 10, one = func, four = func

// Local Scope three func
// 1. Creation Phase - three: t = undefined && inherit two func, one func, global scope z = 15, three = func & y = 5, two = func & x = 10, one = func, four = func
// 2. Execution Phase - three: t = 30;

// Local Scope four func
// 1. Creation Phase - four: t = undefined && inherit global scope x = 10;
// 2. Execution Phase - four: Like comment above
