/* eslint-disable no-param-reassign */
import store from '@/store';
import app from '@/main';
import { API_TOKEN } from '@/constants/api-constants';

/**
 *  TODO: Add language params
 * @param {*} config
 */
export default function beforeRequestConfig(config) {
  // console.log(`beforeRequestConfig -> config`, config);
  // Do something before request is sent
  // console.warn('Before request');

  //  Generate cancel token source
  const source = axios.CancelToken.source();

  // Set cancel token on this request
  config.cancelToken = source.token;

  // Add to vuex to make cancellation available from anywhere
  store.commit('cancelRequest/ADD_CANCEL_TOKEN', source);

  // Add access_token
  const access_token = localStorage.getItem(API_TOKEN.ACCESS_TOKEN);
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }

  // TODO: For hide loading
  if (config.hideLoading) {
    //
  } else {
    //
    app.$screenloading(true);
  }

  return config;
}
