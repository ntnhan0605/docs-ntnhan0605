/*
function demoThrow() {
  // Xử lý ...

  throw new Error('Có lỗi xảy ra');
}

try {
  setTimeout(() => {
    demoThrow();
  }, 1000);
} catch(err) {
  console.log('Xy ly loi', err);
}



console.log('Doan chuong trinh run ....');
*/




/**
 * Example 01
 */

// Trong tầm kiểm soát
setTimeout(function(){
  // ????
}, 1000);
// Trong tầm kiểm soát























/**
 * Example 02
 */
import checkoutAnalytics from 'libs';
import chargeCreditCard from 'libs';


const info = {
  // ...
}

let isCharged = false;

checkoutAnalytics(info, function(res) {
  if (isCharged === false) {
    chargeCreditCard(res);
  }

  isCharged = true;
})