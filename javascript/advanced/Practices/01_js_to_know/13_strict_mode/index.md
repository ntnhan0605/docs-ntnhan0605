# <div align="center">Strict Mode</div>

- Chế độ nghiêm ngặt của Javascript.

- Cú pháp sử dụng `"use strict"`, **Strict Mode** được sử dụng từ vị trí add `'use strict'`.

- Khi sử dụng chế độ **Strict mode** thì phải truyền theo dạng ràng buộc tường minh (`explicit`) hoặc ràng buộc ngầm (`dot notation`)

- Khi kích hoạt **Strict mode** thì không cho phép hàm sử dụng với tham số mặc định

```javascript
function sum(a = 1, b = 2) {
  // SyntaxError: "use strict" not allowed in function with default parameter
  "use strict";
  return a + b;
}
```
