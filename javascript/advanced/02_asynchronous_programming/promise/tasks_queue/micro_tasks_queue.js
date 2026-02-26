/**
 *
 * - Micro tasks queue:
 * 		- Dùng với Promise.
 * 		- Hàm trong queueMicrotask.
 *
 *
 * - MICRO TASKS QUEUE có thứ tự ưu tiên cao hơn MACRO TASKS trong cùng một thời điểm.
 */

const promiseObject = new Promise(true);

queueMicrotask(() => {
  console.log('micro task queue 1');
});
