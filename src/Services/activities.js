import axios from './axios';

export function getActivities(employeeId, userId, organizationId) {
  return axios
    .get(`/activities/byLearner?employeeId=${employeeId}&userId=${userId}&organizationId=${organizationId}`)
    .then(response => response.data);
}
export function getActivity(activityId, selectedOrganizationId) {
  return axios.get(`/activities/${activityId}?selectedOrganizationId=${selectedOrganizationId}`).then(respnose => respnose.data);
}
