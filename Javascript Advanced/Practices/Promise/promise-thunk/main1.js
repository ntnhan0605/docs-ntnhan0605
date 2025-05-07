//
console.log('?. Hello world'); // 1

setTimeout(() => {
  console.log('?. Hello setTimeout'); // 3
}, 0);

fetch('https://api.github.com/users')
  .then((response) => {
    console.log('?. Hello response : ', response); // 4
  })
  .catch((error) => {
    console.log('?. Hello error : ', error);
  });

console.log('?. Hello Javascript'); // 2

/**
 * Tùy thời điểm thì function callback của fetch sẽ chạy trước/sau setTimeout, và không liên quan đến micro tasks queue hay tasks queue
 */
