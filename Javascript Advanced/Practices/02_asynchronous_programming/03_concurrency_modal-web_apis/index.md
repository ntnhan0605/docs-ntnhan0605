# <div align="center">Concurrency Modal & Web APIs</div>

- **Web APIs** là bộ function tính năng của browser. Sau khi thực hiện tính năng của Web APIs thì tất cả hàm Callback đều được đưa về **Callback Queues**
- **Event loop** là vòng lặp vô hạn, sẽ luôn luôn kiểm tra Call stack nếu đỉnh Call stack rỗng thì thực thi hàm trong Callback queues khi Web APIs trả về.

- setTimeout là function nằm trong tính năng Web APIs, sâu bên dưới là Timer.
