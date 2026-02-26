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

Observable.prototype.takeUntil = function(closeObs$) {
  const source$ = this

  function takeUntilWaitToRun(newOnNextFn) {

    const sourceSubscription = source$.forEach((data) => {
      newOnNextFn(data)
    })

    const closeSubscription = closeObs$.forEach(() => {
      console.log('[Click] va Huy dang Ky')
      sourceSubscription.unsubscribe()
      closeSubscription.unsubscribe()
    })

    return {
      unsubscribe: function() {
        sourceSubscription.unsubscribe()
        closeSubscription.unsubscribe()
      }
    }
  }

  return new Observable(takeUntilWaitToRun)
}

const boxEl = document.querySelector('#box')
const mouseMove$ = Observable.fromEvent(boxEl, 'mousemove')
const click$ = Observable.fromEvent(boxEl, 'click')

mouseMove$
  .map((evt) => {
    return {
      offsetX: evt.offsetX,
      offsetY: evt.offsetY
    }
  })
  .takeUntil(click$)
  .forEach((data) => {
    console.log('data', data)
  })