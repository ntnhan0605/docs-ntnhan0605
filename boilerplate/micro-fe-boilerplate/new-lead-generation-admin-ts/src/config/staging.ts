import { IConfig } from './index';

export const REACT_APP_SERVICE_API_URL = process.env.REACT_APP_SERVICE_API_URL || 'http://localhost:3004';

export const REACT_APP_APP_LINK_URL = process.env.REACT_APP_APP_LINK_URL || 'http://localhost:3004';

const CONFIG: IConfig = {
  API: {
    ROOT_ENDPOINT: REACT_APP_SERVICE_API_URL,
  },
  EXTERNAL_DOMAIN: {
    APP_LINK_URL: REACT_APP_APP_LINK_URL,
  },
  LANG: 'en',
};

export default CONFIG;
