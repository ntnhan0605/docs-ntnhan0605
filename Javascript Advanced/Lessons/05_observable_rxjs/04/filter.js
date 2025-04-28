function Observable(forEachWaitToRun) {
  this.forEach = forEachWaitToRun;
}

Observable.prototype.map = function(callbackFn) {
  const source$ = this;

  function mapWaitToRun(newOnNextFn) {
    const subscription = source$.forEach((evt) => {
      const newValue = callbackFn(evt)
      newOnNextFn(newValue)
    })

    return {
      unsubscribe: function() {
        console.log('[Observable map] Huy dang ky')
        subscription.unsubscribe()
      }
    }
  }

  const newObs$ = new Observable(mapWaitToRun)

  return newObs$
}

Observable.prototype.filter = function(testFn) {
  const source$ = this;

  function filterWaitToRun(newOnNextFn) {
    const subscription = source$.forEach((data) => {
      if (testFn(data) === true) {
        newOnNextFn(data)
      }
    })

    return {
      unsubscribe: function() {
        console.log('[Observable filter] Huy dang ky')
        subscription.unsubscribe()
      }
    }
  }

  const newObs$ = new Observable(filterWaitToRun)

  return newObs$
}

const boxEl = document.querySelector('#box')

window.subscription = Observable.fromEvent(boxEl, 'mousemove')
  .map(evt => {
    return {
      pageX: evt.pageX,
      pageY: evt.pageY
    }
  })
  .filter(evt => {
    return evt.offsetX >= 150 && evt.offsetY >= 100
  })
  .forEach((data) => {
    console.log('data', data)
  })