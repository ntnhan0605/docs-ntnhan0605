//
var join = {
  age: 30,
  callAge() {
    console.log('callAge', this);
  },
};

// Alias - Bí danh
join.callAge(); // dot notation -> Implicit Binding
