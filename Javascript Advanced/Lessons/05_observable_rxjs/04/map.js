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
        subscription.unsubscribe()
      }
    }
  }

  const newObs$ = new Observable(mapWaitToRun)

  return newObs$
}


const boxEl = document.querySelector('#box')

window.subscription = Observable.fromEvent(boxEl, 'mousemove')
  .take(10)
  .map(evt => {
    return {
      pageX: evt.pageX,
      pageY: evt.pageY
    }
  })
  .forEach((data) => {
    console.log('data', data)
  })