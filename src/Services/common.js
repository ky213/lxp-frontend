import axios from 'axios';

export function uploadFile(url, file) {
  return axios.put(url, file);
}
