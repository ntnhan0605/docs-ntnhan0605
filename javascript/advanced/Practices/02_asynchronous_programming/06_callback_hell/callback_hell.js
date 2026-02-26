/**
 * Example
 *
 * Xử lí lỗi
 *
 */

function demoThrow() {
  throw new Error('Có lỗi xảy ra');
}

try {
  demoThrow(); // Function được đưa vào try/catch để không bị lỗi
  setTimeout(function () {
    // Buộc phải đăt try/catch cục bộ để không bị crash app
    try {
      demoThrow();
    } catch (error) {
      console.log('Xử lí lỗi : ', error);
    }
  }, 1000);
} catch (error) {
  console.log('Xử lí lỗi : ', error);
}

console.log('Đoạn chương trình run ...');

/**
 *
 * Example
 *
 * Giao quyền kiểm soát chương trình cho bên thứ 3 (Trust Issues)
 *
 * Đối với trường hợp làm checkout cho khách hàng và có thêm bên thứ 3 để tracking nên mình phải tự kiểm soát việc charged phí ở đây.
 *
 * Để ngăn chặn nguy cơ tiềm ẩn charged phí nhiều lần hoặc một lí dó nào đó libs làm cho hàm callback của checkoutAnalytics bị chạy nhiều lần.
 * 1. Tạo 1 biến với giá trị false.
 * 2. Đưa biến đó vào callback của hàm để kiểm soát việc gọi thêm hàm bên trong.
 *
 *
 */

import checkoutAnalytics from 'libs';
import checkoutCreditCard from 'libs';

const info = {
  ///
};

let isCharged = false;

checkoutAnalytics(info, function (res) {
  if (isCharged === false) {
    checkoutCreditCard(res);
  }
  isCharged = true;
});
