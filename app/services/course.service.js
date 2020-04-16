import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
const routePrefix = `${config.apiUrl}/courses`;

export const courseService = {
    getAll,
    getById,
    deleteCourses
};

function getAll(instituteId, programId, page, take, filter) {    
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ instituteId, programId, page, take, filter });
    return fetch(`${config.apiUrl}/courses?${query}`, requestOptions).then(handleResponse);    
}

function getById(courseId, instituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({courseId, instituteId});
    return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(handleResponse);
}

function deleteCourses(courseIds, instituteId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({courseIds, instituteId})
    };
    
    return fetch(`${routePrefix}/deleteCourses`, requestOptions).then(handleResponse);
}