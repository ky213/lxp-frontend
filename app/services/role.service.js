import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const roleService = {
  getAll,
  getCmRoles
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/roles`, requestOptions).then(handleResponse);
}

function getCmRoles() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/roles/getCmRoles`, requestOptions).then(handleResponse);
}