jQuery.extend(jQuery.validator.messages, {
  required: '此為必填欄位',
  email: '請填入有效的 email 地址',
  number: '請填入有效的電話號碼',
  digits: '此欄位僅能輸入數字',
  maxlength: jQuery.validator.format('請輸入少於 {0} 位數'),
  minlength: jQuery.validator.format('請輸入至少 {0} 位數'),
  //
});
