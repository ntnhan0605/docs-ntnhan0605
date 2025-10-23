import axios from 'axios';

import beforeRequestConfig from './beforeRequestConfig';
import beforeRequestError from './beforeRequestError';
import afterResponseResolve from './afterRequestResolve';
import afterResponseError from './afterRequestError';

const Api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60000,
});

// Add a request interceptor
Api.interceptors.request.use(beforeRequestConfig, beforeRequestError);

// Add a response interceptor
Api.interceptors.response.use(afterResponseResolve, afterResponseError);

export default Api;
