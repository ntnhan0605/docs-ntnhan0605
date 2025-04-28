/**
 * Test operator: TAKE
 */

/*
const subTake = Observable
  .interval(1000)
  .take(100)
  .subscribe({
    next: (data) => console.log('[1. take] next:', data),
    error: (err) => console.log('[1. take] err:', error),
    complete: () => console.log('[1. take] complete: ')
  })
*/

/**
 * Test operator: MAP
 */

/*
const subMap = Observable
  .fromEvent(document.getElementById('box'), 'mousemove')
  .take(10)
  .map(evt => ({
    pageX: evt.pageX,
    pageY: evt.pageY
  }))
  .subscribe({
    next: (data) => console.log('[2. map] next:', data),
    error: (err) => console.log('[2. map] err:', error),
    complete: () => console.log('[2. map] complete: ')
  })
*/

/**
 * Test operator: FILTER
 */

/*
const subFilter = Observable
  .fromEvent(document.getElementById('box'), 'mousemove')
  .map(evt => ({
    offsetX: evt.offsetX,
    offsetY: evt.offsetY
  }))
  .filter(evt => evt.offsetX >= 150)
  .subscribe({
    next: (data) => console.log('[3. filter] next:', data),
    error: (err) => console.log('[3. filter] err:', error),
    complete: () => console.log('[3. filter] complete: ')
  })
*/