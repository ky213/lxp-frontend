import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
const routePrefix = `${config.apiUrl}/courses`;

export const courseService = {
    getAll,
    getById,
    deleteCourses,
    getAllJoinedCourses,
    joinCourse
};

function getAll(organizationId, programId, page, take, filter) {    
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ organizationId, programId, page, take, filter });
    return fetch(`${routePrefix}?${query}`, requestOptions).then(handleResponse);    
}

function getById(courseId, organizationId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({courseId, organizationId});
    return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(handleResponse);
}

function deleteCourses(courseIds, organizationId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({courseIds, organizationId})
    };
    
    return fetch(`${routePrefix}/deleteCourses`, requestOptions).then(handleResponse);
}

function getAllJoinedCourses(organizationId, programId , page, take, filter)  {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ organizationId, programId, page, take, filter });
    return fetch(`${routePrefix}/getAllJoined?${query}`, requestOptions).then(handleResponse); 
}

function joinCourse(courseId, organizationId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ organizationId , courseId }),
      };
    
      return fetch(`${routePrefix}/joinCourse`, requestOptions)
        .then(handleResponse)
        .then((data) => {
          return data;
        });
}
