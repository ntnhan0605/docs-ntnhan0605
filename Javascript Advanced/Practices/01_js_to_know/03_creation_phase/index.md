# <div align="center">Creation Phase</div>

## Creation Phase

- Setup memory (Variables Environment)
- Định nghĩa Scope Chain
  - Global Scope
  - Script Scope
  - Block Scope
  - Function Scope
- Ràng buộc từ khóa `this` (Ngoại trừ Arrow Function)
  - Default binding
  - Implicit binding
  - Explicit binding

---

- Scope Chain trong môi trường Browser thì **Global Scope** = `window` = `this`
- Giai đoạn khởi tạo thì JS quét hết file rồi khởi tạo memory theo từng biến và ở bước này giá trị của các biến đều là `undefined`
