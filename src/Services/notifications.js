import axios from 'axios';

export function getUnreadNotifications(limit, selectedOrganizationId) {
  return axios.get(`/notifications/unread?limit=${limit}&selectedOrganizationId=${selectedOrganizationId}`);
}

export function getNotifications(page, take) {
  return axios.get(`/notifications?page=${page}&take=${take}`);
}
