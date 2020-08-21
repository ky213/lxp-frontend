import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';

const routePrefix = `${config.apiUrl}/announcements`;

export const announcementService = {
  getAll,
  getById,
  getByUser,
  getByUserAll,
  create,
  downloadFile,
  update,
  addFile,
  deleteFile,
  markAnnouncementAsRead,
  deleteAnnouncements,
};

function getAll(organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId });
  return fetch(`${routePrefix}/getAll?${query}`, requestOptions).then(
    handleResponse
  );
}

function getById(announcementId, organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ announcementId, organizationId });
  return fetch(`${routePrefix}/getById?${query}`, requestOptions).then(
    handleResponse
  );
}

function getByUser(organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId });
  return fetch(`${routePrefix}/getByUser?${query}`, requestOptions).then(
    handleResponse
  );
}

function getByUserAll(organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  let query = buildQuery({ organizationId });
  return fetch(`${routePrefix}/getByUserAll?${query}`, requestOptions).then(
    handleResponse
  );
}

function create(announcement) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(announcement),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function update(announcement) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(announcement),
  };

  return fetch(`${routePrefix}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function addFile(file) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(file),
  };

  return fetch(`${routePrefix}/addFile`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteFile(announcementFileId) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  };

  return fetch(
    `${routePrefix}/deleteFile/${announcementFileId}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function downloadFile(announcementFileId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
  };

  return fetch(
    `${routePrefix}/downloadFile/${announcementFileId}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function markAnnouncementAsRead(announcementId) {
  const requestOptions = { method: 'POST', headers: authHeader() };
  return fetch(
    `${routePrefix}/markAnnouncementAsRead/${announcementId}`,
    requestOptions
  ).then(handleResponse);
}

function deleteAnnouncements(announcements) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(announcements),
  };

  return fetch(`${routePrefix}/deleteAnnouncements`, requestOptions).then(
    handleResponse
  );
}
