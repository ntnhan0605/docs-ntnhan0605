//
setTimeout(() => {
  console.log('Marco task queue');
}, 0);

queueMicrotask(() => {
  console.log('Micro task queue 1');
  queueMicrotask(() => {
    console.log('Micro task queue 2');
    queueMicrotask(() => {
      console.log('Micro task queue 3');
    });
  });
});

console.log('Hello world');
