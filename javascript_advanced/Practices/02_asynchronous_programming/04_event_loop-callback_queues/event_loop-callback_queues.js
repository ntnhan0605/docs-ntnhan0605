//
console.log('1. Hello world 1');

function logHelloworld() {
  console.log('3. Hello world');
}

setTimeout(logHelloworld, 0);

function block3Seconds() {
  const start = new Date().getTime();

  while (true) {
    const end = new Date().getTime();

    if (end - start > 3000) {
      break;
    }
  }
}

block3Seconds();

console.log('2. Hello Javascript');
