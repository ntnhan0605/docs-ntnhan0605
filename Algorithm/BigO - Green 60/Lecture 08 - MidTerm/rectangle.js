function solution(v) {
  var answer = [[]];
  function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  }
  function vector(a, b) {
    return [b[0] - a[0], b[1] - a[1]];
  }
  function isRightAngle(a, b, c) {
    const v1 = vector(b, a);
    const v2 = vector(b, c);
    return dot(v1, v2) === 0;
  }
  function findoutFourthPoint(a, b, c) {
    const tryPoint = (p1, p2, p3) => [
      p1[0] + p2[0] - p3[0],
      p1[1] + p2[1] - p3[1],
    ];
    const checkObject = [
      { d: tryPoint(b, c, a), check: [b, c] },
      { d: tryPoint(a, c, b), check: [a, c] },
      { d: tryPoint(a, b, c), check: [a, b] },
    ];

    for (const { d, check } of checkObject) {
      if (isRightAngle(d, ...check)) {
        return d;
      }
    }
    return null;
  }
  console.log('Hello Javascript');

  answer = findoutFourthPoint(v[0], v[1], v[2]);
  console.log(answer);

  return answer;
}
