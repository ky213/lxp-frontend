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

function getAll(instituteId, programId, page, take, filter) {    
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ instituteId, programId, page, take, filter });
    return fetch(`${config.apiUrl}/courses?${query}`, requestOptions).then(handleResponse);    
}

function getById(id, selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ selectedInstituteId });

    return fetch(`${config.apiUrl}/courses/${id}?${query}`, requestOptions).then(handleResponse);
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
