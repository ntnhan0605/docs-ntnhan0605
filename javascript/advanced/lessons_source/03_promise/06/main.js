
function fakeGetData(url) {
	var fakeResponses = {
		"https://zendvn.com/api/1": "Data1",
		"https://zendvn.com/api/2": "Data2",
		"https://zendvn.com/api/3": "Data3"
	};
	var randomMiliseconds = Math.floor(Math.random() * 5000) + 1000;

	console.log(`Đang gọi API với URL : ${url} - Thời gian ${randomMiliseconds}ms`);

	return new Promise((successFn, errorFn) => {
    setTimeout(function(){
      errorFn(20);
      successFn(fakeResponses[url]);
      successFn(fakeResponses[url]);
      successFn(fakeResponses[url]);
    }, randomMiliseconds);
  })
}


fakeGetData('https://zendvn.com/api/1')
  .then(res => {
    console.log('res', res);
  })
  .catch(err => {
    console.log('err', err);
  })