import localForage from 'localforage';

type FnType = (...args: any[]) => any;

interface ILocalForage {
  config: FnType;
  setItem: FnType;
  getItem: FnType;
  removeItem: FnType;
}

interface IDatabase extends ILocalForage {}

localForage.config({
  driver: localForage.INDEXEDDB,
  name: 'zustandStoreDB',
  version: 1.0,
  storeName: 'zustandKeyValuePairs',
  description: 'IndexedDB for Zustand state persistence',
});

const database: IDatabase = localForage.createInstance({
  name: 'zustandStoreDB',
  storeName: 'zustandKeyValuePairs',
});

export default database;
