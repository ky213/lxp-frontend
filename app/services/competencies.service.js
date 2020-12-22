import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const competenciesService = {
  getAll,
  getById,
  update,
  create,
  deleteCompetencies,
};

const routePrefix = `${config.apiUrl}/competencies/`;

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

function create(competencyData) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyData),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(competencyData) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyData),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteCompetencies(competencyids) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(competencyids),
  };

  return fetch(`${routePrefix}`, requestOptions).then(handleResponse);
}
