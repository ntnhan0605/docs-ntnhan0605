//

// Start TDZ
// Không thể truy cập age khi chưa khỏi tạo và không thể gán cho age giá trị
// console.log(age)
let age = 31; // End TDZ

// console.log(age);

{
  // Start TDZ
  // Không thể truy cập name khi chưa thực thi
  // console.log(name)
  // console.log(fullName)

  let name = 'Nhan';
  let fullName;

  // console.log(name)
  console.log(fullName);

  window.hello = 'world';
  this.course = 'Javascript';
}
