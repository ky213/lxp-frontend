import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefix = `${config.apiUrl}/superadmins`;

export const superAdminService = {
    getAll,
    getByUserId,
    add,
    update
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}

function getByUserId(userId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ userId });
  return fetch(`${routePrefix}/getByUserId?${query}`, requestOptions).then(handleResponse);
}
 
function add(user) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(user)
  };

  return fetch(`${routePrefix}/`, requestOptions)
      .then(handleResponse)
      .then((data) => {
          return data;
      });
}

function update(user) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(user)
  };

  return fetch(`${routePrefix}/`, requestOptions)
      .then(handleResponse)
      .then((data) => {
          return data;
      });
}