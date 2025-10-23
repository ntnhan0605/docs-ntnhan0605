Array.prototype.myForEach = function(callbackFn) {
  var originalArr = this

  for(let index = 0; index < originalArr.length; index++) {
    let value = originalArr[index];
    callbackFn(value, index, originalArr);
  }
}

Array.prototype.myMap = function(callbackFn) {
  var newArr = []
  var originalArr = this

  for(let index = 0; index < originalArr.length; index++) {
    let value = originalArr[index];
    let newValue = callbackFn(value, index, originalArr);

    newArr.push(newValue)
  }

  return newArr
}

Array.prototype.myFilter = function(testFn) {
  var newArr = []
  var originalArr = this

  for(let index = 0; index < originalArr.length; index++) {
    let value = originalArr[index];
    if(testFn(value) === true) {
      newArr.push(value)
    }
  }

  return newArr;
}

Array.prototype.take = function(count) {
  // Check count isNumber??
  var newArr = []
  var originalArr = this

  for(let index = 0; index < originalArr.length; index++) {
    if (index >= count) {
      return newArr
    }

    let value = originalArr[index]
    newArr.push(value)
  }

  return newArr
}

Array.prototype.concatAll = function() {
  // TODO ...
  var newArr = []
  var originalArr = this

  for(let index = 0; index < originalArr.length; index++) {
    let valueOrArray = originalArr[index];

    if (Array.isArray(valueOrArray) === true) {
      valueOrArray.myForEach((value) => {
          newArr.push(value)
      })
    } else {
      newArr.push(valueOrArray)
    }
  }

  return newArr
}