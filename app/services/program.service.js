import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const programService = {
  getAll,
  getById,
  getByCurrentUser,
  update,
  create,
  getBlockTypes,
  deletePrograms,
};

function getAll(organizationId, pageId, recordsPerPage, filter) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId, pageId, recordsPerPage, filter });
  return fetch(`${config.apiUrl}/programs?${query}`, requestOptions).then(
    handleResponse
  );
}

function getById(id, selectedOrganizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ selectedOrganizationId });

  const routePrefix = `${config.apiUrl}/programs/${id}?`;

  return fetch(`${config.apiUrl}/programs/${id}?${query}`, requestOptions).then(
    handleResponse
  );
}

function getByCurrentUser(organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId });
  return fetch(
    `${config.apiUrl}/programs/currentuser?${query}`,
    requestOptions
  ).then(handleResponse);
}

function create(program) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(program),
  };

  return fetch(`${config.apiUrl}/programs`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(program) {
  /* console.log("Update program:", program) */
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(program),
  };

  return fetch(`${config.apiUrl}/programs`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getBlockTypes() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/programs/block-types`, requestOptions).then(
    handleResponse
  );
}

function deletePrograms(programs) {
  /*  console.log("Client servis update subspeciality:", subspeciality) */
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(programs),
  };

  return fetch(`${config.apiUrl}/programs`, requestOptions).then(
    handleResponse
  );
}
