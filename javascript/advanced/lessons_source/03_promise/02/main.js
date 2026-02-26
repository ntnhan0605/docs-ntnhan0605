// API Github: https://api.github.com/users


const promiseObj = fetch('https://api.github.commm');


// promiseObj.then(
//   (data) => {
//     console.log('data', data);
//   }, 
//   (error) => {
//     console.log('error', error);
//   }
// )

promiseObj.then(
  (data) => {
    console.log('data', data);
  }
).catch(
  (error) => {
    console.log('error', error);
  }
)