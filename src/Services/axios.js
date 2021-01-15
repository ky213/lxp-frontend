import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000 * 60, // 1 minute
});
instance.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${localStorage.usertoken || sessionStorage.usertoken}`;
  return config;
});

export default instance;
