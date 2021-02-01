import axios from 'axios';
import { TIMEOUT } from 'Config/constants';

export function uploadFile(url, file) {
  return axios.put(url, file, {
    timeout: TIMEOUT * 2,
    headers: {
      'Content-Type': file.type,
    },
  });
}
