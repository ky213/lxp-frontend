import axios from 'axios';

import { AUTH_TOKEN_KEY, TIMEOUT } from './constants';

axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default clearAuthentication => {
  const onRequestSuccess = config => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
    console.log('TOKEN\n', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = response => response;

  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if ([401, 403].includes(status)) {
      clearAuthentication();
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};
