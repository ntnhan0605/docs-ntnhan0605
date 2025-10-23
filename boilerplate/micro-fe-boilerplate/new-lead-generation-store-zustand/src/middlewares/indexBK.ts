// middlewares/index.ts
import { StoreApi } from 'zustand';
import localForage from 'localforage';

/**
 * White list for stores that need persistence
 * You can add more store names here
 */
const WHITE_LIST = ['zustandStore']; // Add 'zustandStore' or any other store names to persist

// Persistent middleware for Zustand
export const persistent =
  <T>(storeName: string) =>
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], api: StoreApi<T>) => {
    if (WHITE_LIST.includes(storeName)) {
      let initialState: T | null = null;

      // Fetch the initial state synchronously before Zustand initializes
      const loadInitialState = async () => {
        try {
          const storedState = await localForage.getItem(storeName);
          if (storedState) {
            initialState = storedState as T;
            set(initialState); // Set Zustand state with persisted data
          }
        } catch (error) {
          console.error(`Error loading persisted store "${storeName}":`, error);
        }
      };

      // Call the async function immediately but don't await
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
