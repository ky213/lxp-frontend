import axios from './axios';

export const userApi = {
  login(email, password) {
    return axios.post(`/users/authenticate`, { email, password }).then(respnose => respnose.data);
  },
  getProfile(token) {
    return axios.post(`/users/authToken/?token=${token}`).then(response => response.data);
  },
  getUserProfile(employeeId) {
    return axios.get(`/users/getByEmployeeId/${employeeId}`).then(response => response.data);
  },
};

export const coursesApi = {
  getCourses(organizationId, page, take) {
    return axios.get(`/courses?organizationId=${organizationId}&page=${page}&take=${take}`).then(response => response.data);
  },
};

export const activitiesApi = {
  getActivities(employeeId, userId, organizationId) {
    return axios
      .get(`/activities/byLearner?employeeId=${employeeId}&userId=${userId}&organizationId=${organizationId}`)
      .then(response => response.data);
  },
  getActivity(activityId, selectedOrganizationId) {
    return axios.get(`/activities/${activityId}?selectedOrganizationId=${selectedOrganizationId}`).then(respnose => respnose.data);
  },
};

export const notificationsApi = {
  getUnreadNotifications(limit, selectedOrganizationId) {
    return axios
      .get(`/notifications/unread?limit=${limit}&selectedOrganizationId=${selectedOrganizationId}`)
      .then(respnose => respnose.data);
  },
  getNotifications(page, take) {
    return axios.get(`/notifications?page=${page}&take=${take}`).then(response => response.data);
  },
};

export const programsApi = {
  getPrograms(organizationId, pageId, perPage) {
    return axios
      .get(`programs?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`)
      .then(response => response.data);
  },
};
