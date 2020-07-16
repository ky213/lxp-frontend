import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const activityService = {
    getAll,
    getById,
    update,
    updateStatus,
    create,
    getActivityTypes,
    logActivity,
    updateLogActivity,
    getParticipationLevels,
    getLogActivityById,
    updateLogActivityStatus,
    getReplies,
    addReply,
    updateReply,
    deleteReply
};

function getAll(programId, from, to, selectedOrganizationId) {
    const requestOptions = { 
        method: 'GET', 
        headers: authHeader(), 
        //credentials: 'include' 
    };

    let query = buildQuery({from, to, selectedOrganizationId});
    return fetch(`${config.apiUrl}/activities?${query}`, requestOptions).then(handleResponse);

    //return fetch(`${config.apiUrl}/activities`, requestOptions).then(handleResponse);
}

function getActivityTypes(selectedOrganizationId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({selectedOrganizationId});
    return fetch(`${config.apiUrl}/activities/types?${query}`, requestOptions).then(handleResponse);
}


function getById(id, selectedOrganizationId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/activities/${id}?selectedOrganizationId=${selectedOrganizationId}`, requestOptions).then(handleResponse);
}

function create(activity) {
    //console.log("Create calendar activity:", activity)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activity)
    };

    return fetch(`${config.apiUrl}/activities`, requestOptions)
    .then(handleResponse)
    .then((data) => {
        return data;
    });
}


function update(activity) {
    console.log("Update activity:", activity)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activity)
    };

    return fetch(`${config.apiUrl}/activities`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function updateStatus(activityId, statusId) {
    console.log("Update activity status:", activityId, statusId)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({statusId})
    };

    return fetch(`${config.apiUrl}/activities/${activityId}/status`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function logActivity(activity) {
    //console.log("Create calendar activity:", activity)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activity)
    };

    return fetch(`${config.apiUrl}/activities/log`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function updateLogActivity(activity) {
    console.log("Update log activity:", activity)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(activity)
    };

    return fetch(`${config.apiUrl}/activities/log`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function getParticipationLevels() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/activities/participation-levels`, requestOptions).then(handleResponse);
}

function getLogActivityById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/activities/log/${id}`, requestOptions).then(handleResponse);
}

function updateLogActivityStatus(activityId, statusId) {
    console.log("Update log activity status:", activityId, statusId)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({statusId})
    };

    return fetch(`${config.apiUrl}/activities/log/${activityId}/status`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}


function getReplies(activityId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/activities/${activityId}/replies`, requestOptions).then(handleResponse);
}

function addReply(reply) {
    //console.log("Create calendar activity:", activity)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(reply)
    };

    return fetch(`${config.apiUrl}/activities/reply`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function updateReply(replyId, message) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({text:message})
    };

    return fetch(`${config.apiUrl}/activities/reply/${replyId}`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

function deleteReply(replyId) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: null
    };

    return fetch(`${config.apiUrl}/activities/reply/${replyId}`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}