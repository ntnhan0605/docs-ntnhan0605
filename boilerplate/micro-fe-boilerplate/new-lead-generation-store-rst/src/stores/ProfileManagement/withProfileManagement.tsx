import { FC, ComponentType, useState, useLayoutEffect } from 'react';

import databases from '../../cache/';
import { ProfileManagementContainer, storeKey, initialState as initialStoreState } from './';

const withProfileManagementPersist =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  ({ ...props }: any) => {
    const [storePersisted, setStorePersisted] = useState(initialStoreState);

    useLayoutEffect(() => {
      (async function getPersistData() {
        const data = await databases.getItem(storeKey).catch((err: Error) => {
          // tslint:disable-next-line:no-console
          console.error(err);
        });
        const finalData = data || initialStoreState;
        setStorePersisted({
          ...finalData,
          initiated: true,
        });
      })();
    }, []);

    if (storePersisted && !storePersisted.initiated) return null;

    return (
      <ProfileManagementContainer isGlobal={true} initialState={storePersisted}>
        <Component {...(props as P)} />
      </ProfileManagementContainer>
    );
  };

export default withProfileManagementPersist;
