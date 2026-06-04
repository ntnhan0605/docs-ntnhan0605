import { create, type StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface IndoorMapState {
  items?: unknown[];
}

export interface IndoorMapActions {
  onChange?: () => void;
}

export interface IndoorMapStore extends IndoorMapActions, IndoorMapState {}

export const indoorMapSlice: StateCreator<
  IndoorMapStore,
  [['zustand/immer', 'never']],
  [],
  Record<string, unknown>
> = (set, get) => {
  return {};
};

export const indoorMapStore = create<IndoorMapStore>()(immer(indoorMapSlice));
