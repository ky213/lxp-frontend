import config from '@/config';
import { authHeader, handleResponse, buildQuery } from "@/helpers";

const routePrefix = `${config.apiUrl}/academic_years`;

export const academicYearService = {
  getByInstituteId,
  getByLoggedInUser,
  getByProgramId,
  getById,
  create,
  update,
  deleteAcademicYear,
  deleteAcademicYears
};

function getByInstituteId() {
  return getByLoggedInUser();
}

function getByLoggedInUser(filterInstituteId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ filterInstituteId });
  return fetch(`${routePrefix}?${query}`, requestOptions).then(handleResponse);
}

function getByProgramId(programId, instituteId) {
  console.log('front getByProgramId', programId, instituteId);
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ programId, instituteId });
  return fetch(`${routePrefix}/getByProgramId?${query}`, requestOptions).then(handleResponse);
}


function getById(academicYearId, instituteId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  let query = buildQuery({ academicYearId, instituteId });
  return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(handleResponse);
}

function create(academicYear, instituteId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({academicYear, instituteId})
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}

function update(academicYear, instituteId) {
  console.log('client service update', academicYear);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({academicYear, instituteId})
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}

function deleteAcademicYear(academicYearId, instituteId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };
  
  let query = buildQuery({ academicYearId, instituteId });
  
  return fetch(`${routePrefix}?${query}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}

function deleteAcademicYears(instituteId, academicYears) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({instituteId, academicYears})
  };  
  
  return fetch(`${routePrefix}/deleteAcademicYears`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}
