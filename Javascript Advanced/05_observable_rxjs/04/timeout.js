function Observable(forEachWaitToRun) {
  this.forEach = forEachWaitToRun;
}

Observable.timeout = function(miliseconds) {

  function timeoutWaitToRun(onNextFn) {
    console.log('[Observable Timeout] Bat dau dang ky nhan du lieu')

    const timeoutId = setTimeout(() => {
      onNextFn(miliseconds)
    }, miliseconds);

    return {
      unsubscribe: function() {
        console.log('[Observable Timeout] Huy dang ky nhan du lieu')
        clearTimeout(timeoutId)
      }
    }
  }

  const newObs$ = new Observable(timeoutWaitToRun);

  return newObs$
}

Observable.timeout(1000).forEach((miliseconds) => {
  console.log(`Run after ${miliseconds}ms`)
})