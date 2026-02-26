# <div align="center">JS Runtime & Engine</div>

- **Javascript** là ngôn ngữ đơn luồng (**Single Thread**), vì không thể chạy song song cùng lúc 2 tác vụ. Để hỗ trợ cho javascript chạy các tác vụ bất đồng bộ thì cần có thêm **WebAPIs, Event Loop, Callback Queues** để hỗ trợ.
- **Javascript Runtime** có thể chạy ở phía server cụ thể là môi trường NodeJS.

---

!["JS Runtime & Engine"](./image.png)

**Javascript Runtime**(Browser) trên trình duyệt bao gồm 4 thành phần:

- **Javascript Engine** gồm 2 thành phần chính:
  - **Memory Heap** trong JS được xây dựng sẵn cơ chế cấp phát bộ nhớ và dọn dẹp bộ nhớ khi không sử dụng. JS là **ngôn ngữ bậc cao**
  - **Call Stack** là chồng thực thi được dùng để **xử lí các tác vụ đồng bộ** trong javascript. Hàm sẽ được xếp chồng lên nhau để thực thi theo thứ tự, sau khi thực thi xong hàm sẽ được **remove ra khỏi đỉnh Call Stack (POP)**. 
- **WebAPIs**.
- **Callback Queues(Micro, Macro)**.
- **Event Loop**.

---

**Memory Heap** là vùng bộ nhớ của máy tính được sử dụng để phân bổ bộ nhớ động. Bộ nhớ heap rất cần thiết cho các chương trình cần quản lý một lượng lớn dữ liệu hoặc cấu trúc dữ liệu có kích thước không được biết trước.
