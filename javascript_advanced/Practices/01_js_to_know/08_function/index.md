# <div align="center">Function</div>

## Tại sao phải hiểu rõ về _Function_?

- Xem xét đoạn `code` sau đây:

```javacsript
function binhPhuong100() {
	return 100 * 100;
}

binhPhuong100(); // 10000
```

- Chúng ta cần bình phương 10 thì sao ?

```javacsript
function binhPhuong10() {
	return 10 * 10;
}

binhPhuong10(); // 100
```

- Chúng ta có thể tổng quát hóa để `Function` có khả năng sử dụng lại cao nhất có thể

```javacsript
function binhPhuong(num) {
	return num * num;
}

binhPhuong(10); // 100
```

- Đối với hàm đơn giản như trên, chúng ta sử dụng nguyên lí gì để tổng quát hóa một `Function`?
  - Sử dụng `Parameters` làm đại diện có một giá trị sẽ được truyền trong tương lai khi chúng ta thực thi và gọi hàm.
  - Sau đó sẽ cung cấp một giá trị cụ thể (`Arguments`) khi hàm được gọi tại thời điểm `run-time`.
- `Higher Order Functions (HOF)` cũng tuân theo quy tắc này:
  - Thay vì sử dụng `Parameters` đại diện cho một giá trị thông thường (Như `number`, `string`, ...)
  - Sử dụng `Parameters` đại diện cho một tác vụ phức tạp hơn (`Function`)
  - Chúng ta chỉ xác định tác vụ này làm việc gì tại thời điểm thực thi hàm `HOF` này mà thôi
