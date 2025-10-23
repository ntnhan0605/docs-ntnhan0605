// export const IS_STAGING = false
export const IS_STAGING = window.location.host.includes('dev') || window.location.host.includes('localhost');

export const FORMAT_DAY = 'DD MMM, YYYY HH:mm';

export const FORMAT_DAY_API = 'YYYY-MM-DD HH:mm:ss';
