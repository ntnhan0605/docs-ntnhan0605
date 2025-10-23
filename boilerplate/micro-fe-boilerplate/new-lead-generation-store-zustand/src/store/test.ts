import { createStore } from 'zustand/vanilla';
import { persistent } from '../middlewares';

interface TLeadGenStore {
  count: number;
  increment: () => void;
  clear: () => void;
}

export const storeName = 'zustandStore';

const store = createStore<TLeadGenStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => {
      const newState = { count: state.count + 1 };
      return newState;
    });
  },
  clear: () => {
    set({ count: 0 });
  },
}));

// Apply persistent middleware
persistent(storeName)(store.setState, store.getState, store);

export default store;
