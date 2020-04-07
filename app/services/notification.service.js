import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

export const notificationService = {
    getAll,
    getAllUnread,
    getUnreadCount,
    getById,
    setRead
};

function getAll(page, take, selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({page, take, selectedInstituteId});

    return fetch(`${config.apiUrl}/notifications?${query}`, requestOptions).then(handleResponse);

    //return fetch(`${config.apiUrl}/activities`, requestOptions).then(handleResponse);
}


function getAllUnread(limit, selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({limit, selectedInstituteId});
    return fetch(`${config.apiUrl}/notifications/unread?${query}`, requestOptions).then(handleResponse);
}

function getUnreadCount(selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ selectedInstituteId});
    return fetch(`${config.apiUrl}/notifications/unread-count?${query}`, requestOptions).then(handleResponse);
}

function getById(id, selectedInstituteId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/notifications/${id}?selectedInstituteId=${selectedInstituteId}`, requestOptions).then(handleResponse);
}


function setRead(notification) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(notification)
    };

    return fetch(`${config.apiUrl}/notifications/${notification.notificationId}/read`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
    });
}

