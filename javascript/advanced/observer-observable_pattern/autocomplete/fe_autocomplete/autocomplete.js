var searchStr = '';
var url = 'http://localhost:8888/data?search=' + searchStr;

// fetch('http://localhost:8888/data?search=' + searchStr)
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     return res.data;
//   });

Observable.fetch(url).forEach((data) => console.log(data));

/**
 *
 *
$.....evt...evt...evt..........evt...........evt.........evt......................$
  ----- map -> evt.target.value
$.....'a'...'ab'...'abc'..........'ab'...........'a'.........''........'g'....'ge'..........$
  ----- debounceTime(400)
$..................'abc'................................................'ge'............$
	----- map -> makeUrl(str)
$..................'http://localhost:8888/data?search=abc'................................................'http://localhost:8888/data?search=ge'............$
	----- map -> fetch(url)
$ $..........................fetch(url)............$ $..........................fetch(url)............$ $
$..........................[{}, {}]............$ fetch
$.......................................................[{}, {}]............$ fetch
 *
 */
