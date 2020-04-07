import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const instituteService = {
    getAll,
    getById,
    update,
    create,
    deleteInstitutes
};

function getAll(pageId, recordsPerPage, filter) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ pageId, recordsPerPage, filter });
    return fetch(`${config.apiUrl}/institutes?${query}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/institutes/${id}`, requestOptions).then(handleResponse);
}

function create(institute) {
    console.log("Create institute:", institute)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(institute)
    };

    return fetch(`${config.apiUrl}/institutes`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function update(institute) {
    console.log("Update institute:", institute)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(institute)
    };

    return fetch(`${config.apiUrl}/institutes`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function deleteInstitutes(institutes) {
    console.log("Delete institutes:", institutes)
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(institutes)
    };

    return fetch(`${config.apiUrl}/institutes`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}