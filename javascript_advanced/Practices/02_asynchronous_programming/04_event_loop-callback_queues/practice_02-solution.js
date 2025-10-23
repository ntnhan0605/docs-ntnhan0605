function fakeGetData(url, callbackFn) {
  var fakeResponse = {
    'https://localhost/api/1': 'Data 1',
    'https://localhost/api/2': 'Data 2',
    'https://localhost/api/3': 'Data 3',
  };

  var randomMiliseconds = Math.floor(Math.random() * 5000 + 1000);

  console.log(`Đang gọi hàm với URL ${url} - Thời gian ${randomMiliseconds}ms`);
  setTimeout(function () {
    callbackFn(fakeResponse[url]);
  }, randomMiliseconds);
}

/**
 *
 * Yêu cầu challenge 02:
 * 1. Các lời gọi API sẽ có thời gian chạy khác nhau & ngẫu nhiên.
 * 2. Cả ba lời gọi API phải được gọi đồng thời cùng một lúc.
 * 3. Chỉ áp dụng kiến thức cơ bản của Javascript (Không dùng Promise).
 * 4. API nào chạy xong phải in ra kết quả ngay (Nhưng phải đảm bảo thứ tự 1 -> 2 -> 3)
 */

function startRunAPI(url) {
  let res = null;
  let callbackFn = null;

  fakeGetData(url, function (data) {
    if (callbackFn !== null) {
      callbackFn(data);
    } else {
      res = data;
    }
  });

  return function getData(cbFn) {
    if (res !== null) {
      cbFn(res);
    } else {
      callbackFn = cbFn;
    }
  };
}

let fakeFnData1 = startRunAPI('https://localhost/api/1');
let fakeFnData2 = startRunAPI('https://localhost/api/2');
let fakeFnData3 = startRunAPI('https://localhost/api/3');

fakeFnData1(function (res1) {
  console.log(res1);
  fakeFnData2(function (res2) {
    console.log(res2);
    fakeFnData3(function (res3) {
      console.log(res3);
    });
  });
});
