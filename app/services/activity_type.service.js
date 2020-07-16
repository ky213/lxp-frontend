import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const activityTypesService = {
    getAll,
    getById,
    update,
    create
};

const routePrefix = `${config.apiUrl}/activity_type/`;

function getAll(organizationId, pageId, recordsPerPage, filter) {    
    //console.log("Client =====>   organizationId, pageId, recordsPerPage, filter: ", organizationId, pageId, recordsPerPage, filter)
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ organizationId, pageId, recordsPerPage, filter });
    return fetch(`${routePrefix}?${query}`, requestOptions).then(handleResponse);     
}

function getById(id, selectedOrganizationId) {  
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ selectedOrganizationId });  
    return fetch(`${routePrefix}${id}?${query}`, requestOptions).then(handleResponse);  
}

function create(activityType) {
    //console.log("Create activityType:", activityType)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activityType)
    };

    return fetch(`${routePrefix}`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function update(activityType) {
    //console.log("Update activityType:", activityType)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activityType)
    };

    return fetch(`${routePrefix}`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

 