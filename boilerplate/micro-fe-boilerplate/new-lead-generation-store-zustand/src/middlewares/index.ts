import { StoreApi } from 'zustand';
import localForage from 'localforage';

// White list for stores that need persistence
const WHITE_LIST = ['zustandStore'];

// Persistent middleware for Zustand
export const persistent =
  <T>(storeName: string) =>
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], api: StoreApi<T>) => {
    if (WHITE_LIST.includes(storeName)) {
      // Load initial state from localForage before Zustand initializes
      const loadInitialState = async () => {
        try {
          const storedState = await localForage.getItem(storeName);
          if (storedState) {
            set(storedState as T); // Set Zustand state with persisted data
          }
        } catch (error) {
          console.error(`Error loading persisted store "${storeName}":`, error);
        }
      };

      // Load state asynchronously
      loadInitialState();

      // Subscribe to state changes and persist them
      const unsubscribe = api.subscribe(() => {
        try {
          localForage.setItem(storeName, JSON.parse(JSON.stringify(get()))).catch((err: Error) => {
            console.error(`Error saving store "${storeName}" to localForage:`, err);
          });
        } catch (err) {
          console.error(`Error serializing state for store "${storeName}":`, err);
        }
      });

      return () => unsubscribe();
    }

    return () => {};
  };

export default persistent;
