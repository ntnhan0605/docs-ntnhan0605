import { createContainer, createHook, createStore, StoreActionApi } from 'react-sweet-state';

import { IProfileManagement } from './index.d';

type StoreApi = StoreActionApi<IProfileManagement>;

export const PROFILE_MANAGEMENT_STORE = 'StoreProfileManagement';

export const initialState: IProfileManagement = {
  activeUser: null,
  initiated: false,
};

export const actions = {
  setProfileInfo:
    (payload: any) =>
    ({ setState, getState }: StoreApi) => {
      setState({
        ...getState(),
        ...payload,
      });
    },
  reset:
    () =>
    ({ setState }: StoreApi) => {
      setState(initialState);
    },
};

type Actions = typeof actions;

type StoreContainerProps = {
  initialState: IProfileManagement;
};

const getCurrentProfileManagementStore = (state: IProfileManagement) => state;

export const Store = createStore({
  initialState,
  actions,
  name: PROFILE_MANAGEMENT_STORE,
});

const useProfileManagement = createHook(Store);

export const storeKey = `${Store.key}@__global__`;

export const useProfileManagementData = createHook(Store, {
  selector: getCurrentProfileManagementStore,
});

export const ProfileManagementContainer = createContainer<IProfileManagement, Actions, StoreContainerProps>(Store, {
  onInit:
    () =>
    ({ setState }: StoreApi, { initialState: customInitialState }) => {
      setState({ ...customInitialState });
    },
});

export default useProfileManagement;
