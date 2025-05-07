//
const promiseObj = fetch('https://api.github.com/users');

console.log(promiseObj);

// Cách 1
promiseObj.then(
  // callback fulfilled
  (data) => {
    console.log(data);
  },
  // callback error
  (error) => {
    console.log(error);
  }
);

// Cách 2
promiseObj
  .then(
    // callback fulfilled
    (data) => {
      console.log(data);
    }
  )
  .catch(
    // callback error
    (error) => {
      console.log(error);
    }
  );
