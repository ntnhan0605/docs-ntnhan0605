const Observable = window.Rx.Observable

let count = 0;
Observable
  .interval(1000)
  .take(5)
  .map(() => {
    return Observable
      .interval(500)
      .take(5)
  })
  .concatAll()
  .subscribe({
    next: () => {
      count++
      console.log('run ', count)
    }
  })