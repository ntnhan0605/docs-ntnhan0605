# <div align="center">Execution Context (Ngữ cảnh thực thi)</div>

- Khi một đoạn chương trình Javascript được chạy (thực thi) thì Javascript Engine luôn luôn khởi tạo một **Execution Context** để theo dỡi, quản lí và giám sát trình tự thực thi.
- Đoạn chương trình này có thể là một chương trình con **hoặc** toàn bộ ứng dụng khi khởi chạy lần đầu tiên.
  - Chương trình chính (App) **Global Execution Context**
  - Chương trình con (Function, Methods) **Local Execution Context**

---

- Thời điểm trước khi tạo **Execution Context** , _JS Engine_ luôn thực hiện 2 giai đoạn:

  1.  **Createion Phase** làm rất nhiều việc nhở, mà một việc trong đó là khởi tạo memory
  2.  **Execution Phase**

- Khi **Execution Context** được thực thi xong thì _JS Engine_ sẽ thu dọn các biến không cần thiết được khởi tạo ở **Creation Phase**
