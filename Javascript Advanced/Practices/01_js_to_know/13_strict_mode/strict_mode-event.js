//
var btnEl = document.getElementById('click');
var join = {
  addEvent() {
    btnEl.addEventListener('click', this.handleClick);
  },
  handleClick() {
    console.log('handleClick', this);
  },
};

join.addEvent();

join.handleClick();

const obj = {
  calAge() {
    console.log('this', this);
  },
};
obj.calAge();

const func = obj.calAge;

func();
