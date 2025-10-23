function fakeGetData(url, callbackFn) {
  const fakeResponse = {
    'https:url1/api': 'data1',
    'https:url2/api': 'data2',
    'https:url3/api': 'data3',
  };

  const randomMilliseconds = Math.floor(Math.random() * 5000) + 1000;

  console.log(`Đang gọi API với url: ${url} - Thời gian ${randomMilliseconds}`);
  setTimeout(() => {
    callbackFn(null, fakeResponse[url]);
    // callbackFn(new Error('failed'), null);
  }, randomMilliseconds);
}

function myFetch(url) {
  let res = null;
  let err = null;
  let callbackSuccess = null;
  let callbackError = null;

  fakeGetData(url, function (error, data) {
    if (callbackSuccess !== null || callbackError !== null) {
      if (error !== null) callbackError(error);
      else callbackSuccess(data);
    } else {
      res = data;
      err = error;
    }
  });

  return {
    then: function (successFn, errorFn) {
      if (res !== null || err !== null) {
        if (err !== null) errorFn(err);
        else successFn(res);
        // if (res !== null) successFn(res);
        // else if (err !== null) errorFn(err);
      } else {
        callbackSuccess = successFn;
        callbackError = errorFn;
      }
    },
  };
}

let fetchData = myFetch('https:url1/api');

console.log('fakePromise', fetchData.then);

fetchData.then(
  function (response) {
    console.log('** RYAN fetch_by_thunk_pattern.js 54 response : ', response);
  },
  function (error) {
    console.log('** RYAN fetch_by_thunk_pattern.js 57 error : ', error);
  }
);
