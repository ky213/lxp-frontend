import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const courseService = {
    getAll,
    getById,
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








