jQuery.extend(jQuery.validator.messages, {
  required: 'इस क्षेत्र की आवश्यकता है।',
  email: 'कृपया एक मान्य ईमेल पता दर्ज करें',
  number: 'कृपया एक वैध संख्या दर्ज करें',
  digits: 'कृपया केवल अंक दर्ज करें',
  maxlength: jQuery.validator.format('कृपया {0} अक्षर से अधिक दर्ज न करें'),
  minlength: jQuery.validator.format('कृपया कम से कम {0} अक्षर दर्ज करें'),
  //
});
