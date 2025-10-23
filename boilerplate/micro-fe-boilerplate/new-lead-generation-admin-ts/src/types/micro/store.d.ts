declare module 'newLeadGenerationStoreRST/middlewares' {
  import { StoreState } from 'react-sweet-state';

  export const persistent: (storeState: StoreState<any>) => (next: any) => (fn: any) => any;
}

declare module 'newLeadGenerationStoreRST/withProfileManagementPersist' {
  import { FC, ComponentType } from 'react';

  // Define the structure of the persisted store state
  interface PersistedStoreState {
    initiated: boolean;
    [key: string]: any; // This allows other dynamic keys to be part of the state
  }

  // Declare the HOC function
  function withProfileManagementPersist<P extends object>(Component: ComponentType<P>): FC<P>;

  // Export the HOC as default
  export default withProfileManagementPersist;
}

declare module 'newLeadGenerationStoreRST/profileManagementStore' {
  import { Hook, Container } from 'react-sweet-state';
  import { IProfileManagement } from './index.d';

  export const PROFILE_MANAGEMENT_STORE: string;
  export const initialState: IProfileManagement;

  type SetState = (newState: Partial<IProfileManagement>) => void;
  type GetState = () => IProfileManagement;

  export const actions: {
    setProfileInfo: (
      payload: Partial<IProfileManagement>,
    ) => ({ setState, getState }: { setState: SetState; getState: GetState }) => void;
    reset: () => ({ setState }: { setState: SetState }) => void;
  };

  export const Store: any;

  export const storeKey: string;

  export const useProfileManagement: Hook<IProfileManagement>;

  export const useProfileManagementData: Hook<IProfileManagement>;

  export const ProfileManagementContainer: Container<
    IProfileManagement,
    typeof actions,
    { initialState: IProfileManagement }
  >;

  export default useProfileManagement;
}
