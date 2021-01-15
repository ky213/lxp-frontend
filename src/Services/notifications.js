import axios from './axios';

export function getUnreadNotifications(limit, selectedOrganizationId) {
  return axios.get(`/notifications/unread?limit=${limit}&selectedOrganizationId=${selectedOrganizationId}`).then(respnose => respnose.data);
}

export function getNotifications(page, take) {
  return axios.get(`/notifications?page=${page}&take=${take}`).then(response => response.data);
}
