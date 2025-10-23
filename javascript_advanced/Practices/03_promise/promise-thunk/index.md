# <div align="center">Promise & Thunk</div>

- _Thunk_ là một **Function** cho phép delay quá trình lấy dữ liệu.

```
function startRunAPI(url) { ... }
const fnThunk = startRunAPI('https://example.com/api/1');
fnThunk(function(err, data) {
...
})
// Run Me First !!!
```

- _Promise_ là một **Object** cũng cho phép delay quá trình lấy dữ liệu.

```
const promiseObj = fetch('https://example.com/api/1');
// Cách 1
promiseObj.then(
 function(data) {

 },
 function(error) {

 }
)
// Cách 2
promiseObj.then(function(data){

})
.catch(function(error){

})
// Run Me First !!!
```

- Điểm đặc biệt của Promise là tất cả **function callback** được gửi sang Web APIs để chờ.
- Sau khi Web APIs thực hiện lời gọi HTTP hoàn tất, Web APIs sẽ chuyển **function callback** ngược xuống Callback Queues để chờ xử lý.
- Cụ thể là đưa vào **Micro Task Queue**.
