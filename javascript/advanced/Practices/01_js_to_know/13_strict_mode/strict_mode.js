//

function helloWorld() {
  console.log('helloWorld', this);
}

helloWorld();

this.helloWorld();

// 'use strict'; // can use here use for global script-scope
function sayHello() {
  'use strict'; // or can use here
  console.log('Hello', this);
}

sayHello(); // undefined
sayHello.bind()(); // undefined
sayHello.bind(window)(); // window
sayHello.apply(); // undefined
sayHello.apply(window); // window

window.sayHello(); // window
this.sayHello(); // this === window
globalThis.sayHello(); // this === window
