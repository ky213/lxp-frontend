import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
import { authenticationService } from '@/services';

const routePrefix = `${config.apiUrl}/cm`;

export const courseManagerService = {
  add,
  addBulk,
  getAll,
  getAllActive,
  update,
  validateBulk,
};

function add(user, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ user, organizationId }),
  };

  return fetch(`${routePrefix}/add`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function addBulk(users, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ users, organizationId }),
  };

  return fetch(`${routePrefix}/addBulk`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(user, organizationId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ user, organizationId }),
  };

  return fetch(`${routePrefix}/update`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      {
        return data
      }
    });
}

function getAll(pageId, recordsPerPage, filterName, filterOrganizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };

  const query = buildQuery({
    pageId,
    recordsPerPage,
    filterName,
    filterOrganizationId,
  });
  return fetch(`${routePrefix}/filter?${query}`, requestOptions).then(
    handleResponse
  );
}

function getAllActive(
  pageId,
  recordsPerPage,
  filterName,
  filterOrganizationId
) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const query = buildQuery({
    pageId,
    recordsPerPage,
    filterName,
    filterOrganizationId,
  });
  return fetch(`${routePrefix}/filterActive?${query}`, requestOptions).then(
    handleResponse
  );
}

function validateBulk(users, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ users, organizationId }),
  };

  return fetch(`${routePrefix}/validateBulk`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
