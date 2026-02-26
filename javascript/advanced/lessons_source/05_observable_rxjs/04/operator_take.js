function Observable(forEachWaitToRun) {
  this.forEach = forEachWaitToRun;
}



Observable.prototype.take = function(count) {
  const source$ = this

  function newTakeObsWaitToRun(newOnNextFn) {

    let subscription = null;

    if (count > 0) {
      subscription = source$.forEach((data) => {
        count = count - 1
        newOnNextFn(data)
  
        if (count === 0) {
          subscription.unsubscribe()
        }
      })
    }

    return {
      unsubscribe() {
        if (subscription !==  null) {
          subscription.unsubscribe()
        }
      }
    }

  }

  const newObs$ = new Observable(newTakeObsWaitToRun)
  return newObs$
}

const btnEl = document.querySelector('#button')

// const click$ = Observable.fromEvent(btnEl, 'click')
// const clickTake3$ = click$.take(-1)
// clickTake3$.forEach((evt) => {
//   console.log('evt', evt)
// })

Observable
  .fromEvent(btnEl, 'click')
  .take(5)
  .forEach(evt => {
    console.log('evt click', evt)
  })

  Observable
  .fromEvent(document.querySelector('#box'), 'mousemove')
  .take(3)
  .forEach(evt => {
    console.log('evt mousemove', evt)
  })


Observable
  .interval(1000)
  .take(5)
  .forEach(data => {
    console.log('interval run', data)
  })

