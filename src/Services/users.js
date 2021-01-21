import axios from './axios';

export function login(email, password) {
  return axios.post(`/users/authenticate`, { email, password }).then(respnose => respnose.data);
}
export function getProfile(token) {
  return axios.post(`/users/authToken/?token=${token}`).then(response => response.data);
}
export function getUserProfile(employeeId) {
  return axios.get(`/users/getByEmployeeId/${employeeId}`).then(response => response.data);
}
