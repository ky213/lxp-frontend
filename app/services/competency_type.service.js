import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const competencyTypeService = {
  getAll,
  getById,
  update,
  create,
  deleteCompetencyType,
};

const routePrefix = `${config.apiUrl}/competencyType/`;

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

function create(competencyType) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyType),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(competencyType) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyType),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteCompetencyType(competencyTypeIds) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyTypeIds),
  };

  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}
