// import { createStore } from 'zustand/vanilla';
// import { persistent } from '../middlewares';

// interface TLeadGenStore {
//   count: number;
//   increment: () => void;
//   clear: () => void;
// }

// export const storeName = 'zustandStore'; // Store name to be used in WHITE_LIST

// const store = createStore<TLeadGenStore>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ ...state, count: state.count + 1 })),
//   clear: () => set((state) => ({ ...state, count: 0 })),
// }));

// // Apply the persistent middleware directly in the store definition
// persistent(storeName)(store.setState, store.getState, store);

// export default store;

import { createStore } from 'zustand/vanilla';
import { persistent } from '../middlewares/';
import localForage from 'localforage';

interface TLeadGenStore {
  count: number;
  increment: () => void;
  clear: () => void;
}

export const storeName = 'zustandStore';

const defaultState: TLeadGenStore = {
  count: 0,
  increment: () => {},
  clear: () => {},
};

// Async function to load state from IndexedDB
const createPersistentStore = async () => {
  let initialState = defaultState;

  try {
    const storedState = await localForage.getItem(storeName);
    if (storedState) {
      initialState = storedState as TLeadGenStore;
    }
  } catch (error) {
    console.error(`Error loading persisted store "${storeName}":`, error);
  }

  const store = createStore<TLeadGenStore>((set, get) => ({
    ...initialState,
    increment: () => {
      set((state) => {
        const newState = { count: state.count + 1 };
        localForage.setItem(storeName, JSON.parse(JSON.stringify(newState))); // Persist the updated state
        return newState;
      });
    },
    clear: () => {
      set({ count: 0 });
      localForage.setItem(storeName, JSON.parse(JSON.stringify({ count: 0 }))); // Persist the reset state
    },
  }));

  persistent(storeName)(store.setState, store.getState, store);

  return store;
};

// Export a Promise that resolves to the store
const storePromise = createPersistentStore();
export default storePromise;
