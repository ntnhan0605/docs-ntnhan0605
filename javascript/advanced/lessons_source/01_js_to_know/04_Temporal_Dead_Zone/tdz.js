// Start TDZ
// Không thể truy cập age khi chưa
// console.log(age);

let age = 30; // End TDZ

// console.log(age);

{ // Start TDZ

  // Không thể truy cập name khi chưa thực thi
  // console.log(name);
  // console.log(fullName);

  let name = 'ZendVn';
  let fullName;

  // console.log(name);
  // console.log(fullName);
}

// Scope chain