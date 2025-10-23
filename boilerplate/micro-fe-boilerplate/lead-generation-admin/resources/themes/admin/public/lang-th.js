jQuery.extend(jQuery.validator.messages, {
  required: 'ต้องระบุข้อมูลในช่องนี้',
  email: 'กรุณาใส่อีเมล์ที่ถูกต้อง',
  number: 'กรุณาใส่ตัวเลขที่ถูกต้อง',
  digits: 'กรุณาส่เฉพาะตัวเลข',
  maxlength: jQuery.validator.format('กรุณาใส่ตัวเลขมากกว่า {0} หลัก'),
  minlength: jQuery.validator.format('กรุณาใส่ตัวเลขอย่างน้อย {0} หลัก'),
  //
});
