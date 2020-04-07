import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const roleService = {
  getAll,
  getFmRoles
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/roles`, requestOptions).then(handleResponse);
}

function getFmRoles() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/roles/getFmRoles`, requestOptions).then(handleResponse);
}