/**
 *
 * - Macro tasks queue:
 * 		- setTimeout
 * 		- setInterval
 * 		- Hàm Callback trong Event (Click, Scroll,...)
 *
 *
 */

setTimeout(() => {
  console.log('setTimeout ', 1000);
}, 1000);

// Micro tasks queue
queueMicrotask(() => {
  console.log('micro task queue');
});
