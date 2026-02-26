//
var join = {
  age: 30,
  callAge() {
    console.log('callAge', this);
  },
};

join.callAge();

// var func = join.callAge.bind({ hello: 'world' });
// func();

join.callAge.bind({ hello: 'world' })();
join.callAge.bind({ name: 'Nhan' })();
