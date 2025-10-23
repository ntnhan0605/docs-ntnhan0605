# <div align="center">Higher Order Functions & Callbacks</div>

- Đây là khái niệm sử dụng chung trong toàn ngành khoa học máy tính và thậm chí là toán học. Không phải riêng chỉ có trong Javascript.
- Higher order functions là những hàm thỏa **một trong hai** điều kiện sau:
  - Có thể nhận một `function` khác như một đối số (**argument**).
  - Output là một `function`.
- Có rất nhiều Function cốt lõi của javascript sử dụng cơ chế này khiến cho mã nguồn dễ đọc, dễ hiểu hơn `map`, `filter`, `reduce`,...

- Callbacks là một hàm được đưa vào như một đối số **argument** của một hàm khác.

---

```javascript
function cloneArrayAndSquare(arrInput) {
  var arrOutput = [];
  for (var idx = 0; idx < arrInput.length; idx++) {
    arrOutput.push(arrInput[idx] * arrInput[idx]);
  }
  return arrOutput;
}
const arr = [2, 4, 8];
const result = cloneArrayAndSquare(arr); // [4, 16, 64]
```

---

```javascript
function cloneArrayAndDivideBy2(arrInput) {
  var arrOutput = [];
  for (var idx = 0; idx < arrInput.length; idx++) {
    arrOutput.push(arrInput[idx] * arrInput[idx]);
  }
  return arrOutput;
}
const arr = [2, 4, 8];
const result = cloneArrayAndDivideBy2(arr); // [1, 2, 4]
```

---

```javascript
function cloneArrayAndDoSomething(arrInput, func) {
  var arrOutput = [];
  for (var idx = 0; idx < arrInput.length; idx++) {
    arrOutput.push(func(arrInput[idx]));
  }
  return arrOutput;
}

const arr = [2, 4, 8];

const handleAdd3 = function (number) {
  return number + 3;
};

const result = cloneArrayAndDoSomething(arr, handleAdd3); // [5, 7, 11]
```
