import config from '@/config';
import { authHeader, handleResponse, buildQuery } from "@/helpers";

const routePrefix = `${config.apiUrl}/fm`;

export const facultyMemberService = {
  add,
  addBulk,
  getAll,
  getAllActive,
  update,
  validateBulk
};

function add(user, instituteId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({user, instituteId})
  };

  return fetch(`${routePrefix}/add`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}

function addBulk(users, instituteId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({users, instituteId})
  };

  return fetch(`${routePrefix}/addBulk`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}

function update(user, instituteId) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({user, instituteId})
  };

  return fetch(`${routePrefix}/update`, requestOptions)
    .then(handleResponse)
    .then(data => {
        {
            console.log('client', data);
            return data;
        }
    });
}

function getAll(pageId, recordsPerPage, filterName, filterInstituteId) {
  const requestOptions = { method: "GET", headers: authHeader() };

  const query = buildQuery({ pageId, recordsPerPage, filterName, filterInstituteId});
  return fetch(`${routePrefix}/filter?${query}`, requestOptions).then(
    handleResponse
  );
}

function getAllActive(pageId, recordsPerPage, filterName, filterInstituteId) {
  const requestOptions = { method: "GET", headers: authHeader() };
  const query = buildQuery({ pageId, recordsPerPage, filterName, filterInstituteId});
  return fetch(`${routePrefix}/filterActive?${query}`, requestOptions).then(
    handleResponse
  );
}

function validateBulk(users, instituteId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({users, instituteId})
  };

  return fetch(`${routePrefix}/validateBulk`, requestOptions)
    .then(handleResponse)
    .then(data => {
      return data;
    });
}