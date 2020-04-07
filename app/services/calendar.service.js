import config from '@/config';
import { authHeader, handleResponse } from '@/helpers';

export const calendarService = {
    getAll,
    getById,
    update,
    updateStatus,
    create
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/calendar`, requestOptions).then(handleResponse);
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

function updateStatus(eventId, status) {
    console.log("Update calendar event status:", eventId, status)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({status})
    };

    return fetch(`${config.apiUrl}/calendar/event/${eventId}/status`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}