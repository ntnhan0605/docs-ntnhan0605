//
console.log('?. Hello world'); // 1

setTimeout(() => {
  console.log('?. Hello setTimeout'); // 4
}, 0);

fetch('https://api.github.com/users')
  .then((response) => {
    console.log('?. Hello response : ', response); // 5
  })
  .catch((error) => {
    console.log('?. Hello error : ', error);
  });

block5Seconds();
function block5Seconds() {
  const start = new Date().getTime();

  while (true) {
    const end = new Date().getTime();
    if (end - start > 5000) {
      break;
    }
  }
  console.log('?. Hello blocking done'); // 2
}

console.log('?. Hello Javascript'); // 3
