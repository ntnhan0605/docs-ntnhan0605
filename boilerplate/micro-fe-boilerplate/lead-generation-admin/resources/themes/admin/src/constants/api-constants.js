const API_URL = process.env.VUE_APP_API_URL;

export const API_PATH = {
  LOGIN: `${API_URL}/api/login`,
  LOGOUT: `${API_URL}/api/logout`,
  RESET_EMAIL_PASSWORD: `${API_URL}/api/password/email`,
  RESET_PASSWORD: `${API_URL}/api/password/reset`,
  CAMPAIGN: `${API_URL}/api/admin/campaign`,
  CREATE_CAMPAIGN: `${API_URL}/api/admin/campaign`,
  LIST_CAMPAIGN: `${API_URL}/api/admin/campaign`,
  ACCOUNT_INFO: `${API_URL}/api/admin/account`,
  SAVE_ACCOUNT_DETAILS: `${API_URL}/api/admin/account`,
  SAVE_ACCOUNT_PASSWORD: `${API_URL}/api/admin/account/password`,
  USERS: `${API_URL}/api/admin/users`,
  ROLES: `${API_URL}/api/admin/roles`,
  SITES: `${API_URL}/api/admin/sites`,
  LIST_HISTORY: `${API_URL}/api/admin/history`,
  CLIENTS: `${API_URL}/api/admin/clients`,
  CSV_DOWNLOAD_SAMPLE: `${API_URL}/api/admin/campaign/csv/sample`,
  CSV_VALIDATION: `${API_URL}/api/admin/campaign/validation`,
};

export const API_TOKEN = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
};

export const API_STATUS = {
  SUCCESS: 1,
  ERROR: -1,
};
