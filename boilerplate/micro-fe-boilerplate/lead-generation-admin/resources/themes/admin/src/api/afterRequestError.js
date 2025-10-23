import { API_TOKEN } from '@/constants/api-constants';
import { ROUTER } from '@/constants/router-constant';
import app from '@/main';
import router from '@/router';
import axios from 'axios';
import { LOCALSTORAGE } from '../constants/app-constants';

/**
 *
 * https://github.com/axios/axios#cancellation
 * @param {*} error
 */
export default function afterResponseError(error) {
  console.log(error.config);

  app.$screenloading(false);

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (axios.isCancel(error)) {
    // Cancel request
    // console.warn('Request cancel', error.message);
  } else if (error.response) {
    if (!error.config.hideError) {
      const errorData = error.response.data;
      const msgDataRes = (error.response.data && error.response.data._messages && error.response.data._messages[0]) || 'Something wrong!';
      const message = errorData.message || error.message || msgDataRes;
      if (error.response.status === 403) {
        localStorage.removeItem(API_TOKEN.ACCESS_TOKEN);
        localStorage.removeItem(LOCALSTORAGE.USER);
        router.go(ROUTER.LOGIN);
      }
      app.$notify({
        title: message,
        text: 'Please try again or contact admin!',
        type: 'error',
      });
    }
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
  } else if (error.request) {
    app.$notify({
      title: 'Server not available',
      text: 'Please try again or contact admin!',
      type: 'error',
    });
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  }
  return Promise.reject(error);
}
