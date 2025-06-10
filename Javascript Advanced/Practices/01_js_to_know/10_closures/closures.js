//
debugger;
function outerFunc() {
  const number = 31;
  var course = 'Lập trình viên';
  console.log('[scope outerFunc]', course);

  function innerFunc() {
    console.log(number);
    let number2 = 20;
    let total = number + number2;
    console.log('[scope innerFunc] total', total);
    console.log('** RYAN closure.js 12 cource : ', course);
    return total;
  }

  return innerFunc;
}

const inner = outerFunc();

const result = inner();
