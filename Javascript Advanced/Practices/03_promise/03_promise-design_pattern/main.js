//

const promiseObj = fetch('https://api.github.com/users');

console.log(promiseObj);

// promiseObj.then(
//   (data) => {
//     console.log('data : ', data);
//   },
//   (err) => {
//     console.log('error : ', err);
//   }
// );

promiseObj
  .then((data) => {
    console.log('data : ', data);
  })
  .catch((err) => {
    console.log('error : ', err);
  });
