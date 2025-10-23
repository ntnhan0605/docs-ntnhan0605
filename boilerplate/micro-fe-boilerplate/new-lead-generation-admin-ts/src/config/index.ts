import dev from './development';
import staging from './staging';
import prod from './production';

export interface IConfig {
  API: {
    ROOT_ENDPOINT: string;
  };
  EXTERNAL_DOMAIN: {
    APP_LINK_URL: string;
  };
  LANG: string;
}

let config: IConfig = { ...dev };
const env = process.env.REACT_APP_ENV;
switch (env) {
  case 'dev':
    config = dev;
    break;
  case 'staging':
    config = staging;
    break;
  case 'prod':
    config = prod;
    break;
  default:
    break;
}

export const isDevEnv = () => {
  return process.env.REACT_APP_ENV === 'dev';
};

export const defaultConfig = {
  // Add common config values here
  env,
  ...config,
};

export default defaultConfig;
