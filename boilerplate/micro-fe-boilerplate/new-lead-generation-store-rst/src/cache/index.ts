import localForage from 'localforage';

localForage.config({
  driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'newLeadGenerationStoreRST',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description: 'This Database is for storing the entries responses in the indexedDB',
});

const databases: any = localForage.createInstance({
  name: 'newLeadGenerationStoreRST',
  storeName: 'newLeadGenerationStoreRST',
});

export default databases;
