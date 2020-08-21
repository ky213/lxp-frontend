import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefix = `${config.apiUrl}/academic_years`;

export const academicYearService = {
  getByOrganizationId,
  getByLoggedInUser,
  getByProgramId,
  getById,
  create,
  update,
  deleteAcademicYear,
  deleteAcademicYears,
};

function getByOrganizationId() {
  return getByLoggedInUser();
}

function getByLoggedInUser(filterOrganizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ filterOrganizationId });
  return fetch(`${routePrefix}?${query}`, requestOptions).then(handleResponse);
}

function getByProgramId(programId, organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ programId, organizationId });
  return fetch(`${routePrefix}/getByProgramId?${query}`, requestOptions).then(
    handleResponse
  );
}

function getById(academicYearId, organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ academicYearId, organizationId });
  return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(
    handleResponse
  );
}

function create(academicYear, organizationId) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ academicYear, organizationId }),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(academicYear, organizationId) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ academicYear, organizationId }),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteAcademicYear(academicYearId, organizationId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  };

  let query = buildQuery({ academicYearId, organizationId });

  return fetch(`${routePrefix}?${query}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteAcademicYears(organizationId, academicYears) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ organizationId, academicYears }),
  };

  return fetch(`${routePrefix}/deleteAcademicYears`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
