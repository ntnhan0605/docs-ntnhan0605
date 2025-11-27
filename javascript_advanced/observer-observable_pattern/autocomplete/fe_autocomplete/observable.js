function Observable(forEachWaitToRunTime) {
  this.forEach = forEachWaitToRunTime;
}

Observable.timeout = function (timeout = 300) {
  function timeoutWaitToRun(onNextFn) {
    const timeout = setTimeout(onNextFn, timeout);
    return {
      unsubscribe() {
        clearTimeout(timeout);
      },
    };
  }
  return new Observable(timeoutWaitToRun);
};

Observable.interval = function (timeout = 300) {
  function intervalWaitToRun(onNextFn) {
    const interval = setInterval(onNextFn, timeout);
    return {
      unsubscribe() {
        clearInterval(interval);
      },
    };
  }
  return new Observable(intervalWaitToRun);
};

Observable.fetch = function (url, params = {}) {
  function fetchWaitToRun(onNextFn) {
    fetch(url, params)
      .then((res) => res.json())
      .then(({ data }) => onNextFn(data));
    return {
      unsubscribe() {
        //
      },
    };
  }
  return new Observable(fetchWaitToRun);
};
