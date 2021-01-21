import axios from './axios';

export function login(email, password) {
  return axios.post(`/users/authenticate`, { email, password });
}

export const logout = (userId, token) => {
  return axios.post(`/users/logout`, { userId, token });
};
export function getUserProfile(token) {
  return axios.post(`/users/authToken/?token=${token}`);
}
