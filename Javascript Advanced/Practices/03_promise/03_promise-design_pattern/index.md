# <div align="center">Promise & Design Pattern</div>

- **Thunk** là một function cho phép delay quá trình lấy dữ liệu

```javascript
function startRunApi(url) { ... }
const fnThunk = startRunApi('https://github.com/...')
fnThunk(function(err, data) {
})
```

- **Promise** là một object cho phép delay quá trình lấy dữ liệu

```javascript
const promiseObj = fetch('https://github.com/...');
// Cách 1
promiseObj.then(
  function (data) {
    //
  },
  function (error) {
    //
  }
);
// Cách 2
promiseObj
  .then(function (data) {
    //
  })
  .catch(function (err) {
    //
  });
```

- Điểm đặc biệt của **Promise** là tất cả **function callback** được gửi sang **Web APIs** để chờ.
- Sau khi Web APIs thực hiện lời gọi HTTP hoàn tất, Web APIs sẽ chuyển **function callback** ngược xuống Callbacks Queue (**Micro Task Queue**) để chờ xử lí.
