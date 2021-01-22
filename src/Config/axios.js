import axios from 'axios';

import store from 'Store/reduxStore';
import { clearAuthentication } from 'Store/Reducers/authentication';
import { AUTH_TOKEN_KEY } from './constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000 * 60, // 1 minute
});

const onRequestSuccess = config => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponseSuccess = response => response;

const onResponseError = err => {
  const status = err.status || (err.response ? err.response.status : 0);
  if ([401, 403].includes(status)) {
    clearAuthentication(store.dispatch);
  }
  return Promise.reject(err);
};

instance.interceptors.request.use(onRequestSuccess);
instance.interceptors.response.use(onResponseSuccess, onResponseError);

export default instance;
