import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function getActivities(selectedOrganizationId, employeeId, userId, from, to) {
  const query = buildQuery({ selectedOrganizationId, employeeId, userId, from, to });

  return axios.get(`/activities/?${query}`);
}
export function getOneActivity(selectedOrganizationId, activityId) {
  const query = buildQuery({ selectedOrganizationId });

  return axios.get(`/activities/${activityId}?${query}`);
}

export function getActivitiesByLearner(organizationId, employeeId, userId) {
  const query = buildQuery({ organizationId, employeeId, userId });

  return axios.get(`/activities/byLearner?${query}`);
}

export function getActivityTypes(organizationId) {
  const query = buildQuery({ organizationId });

  return axios.get(`/activities/types?${query}`);
}
export function createActivity(activityData) {
  return axios.post(`/activities`, activityData);
}
export function updateActivity(activityData) {
  return axios.put(`/activities`, activityData);
}

export function deleteActivity(activityId) {
  return axios.put(`/activities/${activityId}/status`, { statusId: 3 });
}
