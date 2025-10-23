import { defaults, StoreState } from 'react-sweet-state';

import database from '../../cache';
import { PROFILE_MANAGEMENT_STORE } from '../ProfileManagement';

const WHITE_LIST: string[] = [PROFILE_MANAGEMENT_STORE];

export const persistent = (storeState: StoreState<any>) => (next: any) => (fn: any) => {
  const result = next(fn);
  const { key } = storeState;
  const isWhiteList: string[] = WHITE_LIST.filter((store) => key.includes(store));

  if (isWhiteList.length > 0) {
    const state = storeState.getState();
    database.setItem(storeState.key, state).catch((err: Error) => {
      // tslint:disable-next-line:no-console
      console.error(err);
    });
  }

  return result;
};

// if (isDevEnv()) {
//   defaults.devtools = true;
// }

defaults.middlewares.add(persistent);
