import axios from 'axios';

import { buildQuery } from 'Utils/buildQuery';

export function getActivities(organizationId, employeeId, userId, from, to) {
  const query = buildQuery({ organizationId, employeeId, userId, from, to });

  return axios.get(`/activities/?${query}`);
}
export function getOneActivity(organizationId, activityId) {
  const query = buildQuery({ organizationId, activityId });

  return axios.get(`/activities/${activityId}?selectedOrganizationId=${organizationId}`);
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

export function deleteActivity(activityId, selectedOrganizationId) {
  return axios.get(`/activities`);
}
