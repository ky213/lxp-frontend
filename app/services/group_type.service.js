import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const groupTypesService = {
  getAll,
  getById,
  update,
  create,
  deleteGroupTypes,
};

const routePrefix = `${config.apiUrl}/group_type/`;

function getAll(organizationId, pageId, recordsPerPage, filter) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId, pageId, recordsPerPage, filter });
  return fetch(`${routePrefix}?${query}`, requestOptions).then(handleResponse);
}

function getById(id, selectedOrganizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ selectedOrganizationId });
  return fetch(`${routePrefix}${id}?${query}`, requestOptions).then(
    handleResponse
  );
}

function create(groupType) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(groupType),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(groupType) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(groupType),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteGroupTypes(groupType) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(groupType),
  };

  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}
