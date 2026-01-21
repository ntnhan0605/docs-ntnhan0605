const TIMEOUT = 30 * 60 * 1000;
const WAITING_FIRST_RESP = 'waitingTheFirstResponse';

export const CachedSystem = {
  cached: {} as Record<string, any>,
  clearCached: (prefix: string) => {
    console.log(CachedSystem.cached);
    Object.keys(CachedSystem.cached)
      .filter((k) => k.startsWith(prefix))
      .forEach((key) => {
        console.log(key);
        CachedSystem.cached[key] = undefined;
      });
  },
  withCached: async (key: string, fnResponse: () => Promise<any>) => {
    if (CachedSystem.cached[key] === WAITING_FIRST_RESP) {
      return new Promise((resolve) => {
        const startDate = new Date().getTime();
        const intervalId = setInterval((): void => {
          const currentDate = new Date().getTime();

          if (currentDate - startDate > 3000) {
            clearInterval(intervalId);
          }

          if (typeof CachedSystem.cached[key] === 'object') {
            resolve(CachedSystem.cached[key]);
            clearInterval(intervalId);
          }
        }, 100);
      });
    }

    if (typeof CachedSystem.cached[key] === 'object') {
      return CachedSystem.cached[key];
    }

    CachedSystem.cached[key] = 'waitingTheFirstResponse';
    try {
      const result = await fnResponse();
      CachedSystem.cached[key] = result;
      setTimeout(() => {
        CachedSystem.cached[key] = undefined;
      }, TIMEOUT);
      return result;
    } catch (err) {
      CachedSystem.cached[key] = undefined;
      return Promise.reject(err);
    }
  },
};
