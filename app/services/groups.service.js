import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const groupsService = {
  getAll,
  getById,
  update,
  create,
  deleteGroups,
};

const routePrefix = `${config.apiUrl}/groups/`;

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

function create(groupData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(groupData),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(groupData) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(groupData),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteGroups(group) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(group),
  };

  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}
