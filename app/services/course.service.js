import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefix = `${config.apiUrl}/courses`;

export const courseService = {
    getAll,
    getById,
    update,
    create,
    uploadFile
};

function getAll(instituteId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({instituteId});
  return fetch(`${routePrefix}/getAll?${query}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/calendar/event/${id}`, requestOptions).then(handleResponse);
}

function create(event) {
    //console.log("Create calendar event:", event)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(event)
    };

    return fetch(`${config.apiUrl}/calendar/event`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function update(event) {
    console.log("Update calendar event:", event)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(event)
    };

    return fetch(`${config.apiUrl}/calendar/event`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function uploadFile(file) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(file)
  };
  console.log('file', file);

  return fetch(`${routePrefix}/uploadFile`, requestOptions)
      .then(handleResponse)
      .then((data) => {
          return data;
      });
}