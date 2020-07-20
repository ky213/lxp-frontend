import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefixUsers = `${config.apiUrl}/users`;

export const userService = {
    getAllActive,
    getByEmployeeId,
    getByUserId,
    update,
    updateProfilePhoto,
    validateBulk,
    changePassword,
    deleteEmployees,
    updateProfileData
};

function validateBulk(users, isLearner) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(users)
    };

    console.log('validate', JSON.stringify(users));
    let query = '';
    if (isLearner)     
        query = `${config.apiUrl}/learners/validateBulk`;
    else
        query = `${config.apiUrl}/fm/validateBulk`;

    return fetch(query, requestOptions)
            .then(handleResponse)
            .then((data) => {
                return data;
            });
}

function getAllActive(organizationId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let query = buildQuery({ organizationId });
    return fetch(`${routePrefixUsers}/getAllActive?${query}`, requestOptions).then(handleResponse);
}

function getByEmployeeId(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${routePrefixUsers}/getByEmployeeId/${id}`, requestOptions).then(handleResponse);
}

function getByUserId(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${routePrefixUsers}/getByUserId/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify(user)
    };

    return fetch(`${routePrefixUsers}/update`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function updateProfilePhoto(userId, profilePhoto) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ userId, profilePhoto })
    };

    return fetch(`${routePrefixUsers}/updateProfilePhoto`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data;
        });
}

function changePassword(oldPassword, newPassword) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({oldPassword, newPassword})
    };

    return fetch(`${routePrefixUsers}/change-password`, requestOptions).then(handleResponse);
}

function deleteEmployees(organizationId, employees) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({organizationId, employees})
    };
 
    return fetch(`${routePrefixUsers}/deleteEmployees`, requestOptions)
        .then(handleResponse);
 }

 function updateProfileData(phoneNumber, pagerNumber) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({phoneNumber, pagerNumber})
    };
 
    return fetch(`${routePrefixUsers}/updateProfileData`, requestOptions)
        .then(handleResponse);
 }