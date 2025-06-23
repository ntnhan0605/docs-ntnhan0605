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
 * Yêu cầu challenge 01:
 * 1. Các lời gọi API sẽ có thời gian chạy khác nhau và ngẫu nhiên
 * 2. Các kết quả phải được hiển thị ra cho người dùng đúng theo thứ tự 1 -> 2 -> 3
 */

fakeGetData('https://localhost/api/1', function (res1) {
  fakeGetData('https://localhost/api/2', function (res2) {
    fakeGetData('https://localhost/api/3', function (res3) {
      console.log(res1);
      console.log(res2);
      console.log(res3);
    });
  });
});
