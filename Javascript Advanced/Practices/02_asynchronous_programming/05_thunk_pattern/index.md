# <div align="center">Thunk Pattern</div>

- Thunk là một tên gọi khác của Function
- Function này là một dạng Function với ứng dụng đặc biệt
- Thunk là một function có thể delay quá trình đánh giá biểu thức ra giá trị khi xử lý trong Javascript.

```javascript
// sum là một hàm thông thường
function sum(a, b) {
  return a + b;
}
// Gọi hàm in ra ngay giá trị của biểu thức 10 + 20
console.log(sum(10, 20));
```

```javascript
// Function dùng để tạo ra một thunk
function createThunk() {
  let result = sum(10, 20);
  return function () {
    return result;
  };
}

// Tạo Thunk và xử lý ra kết quả
let fnThunk = createThunk();

// Delay kết quả lấy dữ liệu. Khi gọi thunk thì mới có data.
let result = fnThunk();
```
