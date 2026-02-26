//
var chiPu = {
  hatTalkToMe: function () {
    console.log('------- [hatTalkToMe] -------', this); // chiPu
    let buoiSang = () => {
      console.log('[hatTalkToMe] - buoiSang : ', this); // chiPu
    };
    let buoiToi = function () {
      console.log('[hatTalkToMe] - buoiToi : ', this); // window
    };
    buoiSang();
    buoiToi();
  },
  hatTuiHomNay: () => {
    console.log('------- [hatTuiHomNay] -------', this); // window
    let buoiSang = () => {
      console.log('[hatTuiHomNay] - buoiSang : ', this); // window
    };
    let buoiToi = function () {
      console.log('[hatTuiHomNay] - buoiToi : ', this); // window
    };
    buoiSang();
    buoiToi();
  },
};

chiPu.hatTalkToMe();
chiPu.hatTuiHomNay();

// `hatTuiHomNay` là một Arrow Function vì thế `this` bên trong hàm này có giá trị là scope của function bên ngoài cụ thể vẫn luôn là `window` và không quan tâm bất kỳ giá trị truyền vào.
chiPu.hatTuiHomNay.bind({ name: 'Nhan' })();
chiPu.hatTuiHomNay.call({ name: 'Nhan' });
chiPu.hatTuiHomNay.apply({ name: 'Nhan' });
