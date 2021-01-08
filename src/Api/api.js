import * as axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});
instance.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.usertoken || sessionStorage.usertoken}`;
        return config;
    }
);

export const userApi = {
    login(email, password){
        return instance.post(`/users/authenticate`, {email, password})
        .then(respnose => respnose.data);
    },
    getProfile(token){
        return instance.post(`/users/authToken/?token=${token}`)
        .then(response => response.data);
    },
    getUserProfile(employeeId){
        return instance.get(`/users/getByEmployeeId/${employeeId}`)
        .then(response => response.data);
    }
}

export const coursesApi = {
    getCourses(organizationId, page, take){
        return instance.get(`/courses?organizationId=${organizationId}&page=${page}&take=${take}`)
        .then(response => response.data);
    }
}

export const activitiesApi = {
    getActivities(employeeId, userId, organizationId){
        return instance.get(`/activities/byLearner?employeeId=${employeeId}&userId=${userId}&organizationId=${organizationId}`)
        .then(response => response.data);
    },
    getActivity(activityId ,selectedOrganizationId){
        return instance.get(`/activities/${activityId}?selectedOrganizationId=${selectedOrganizationId}`)
        .then(respnose => respnose.data);
    }
}

export const notificationsApi = {
    getUnreadNotifications(limit, selectedOrganizationId){
        return instance.get(`/notifications/unread?limit=${limit}&selectedOrganizationId=${selectedOrganizationId}`)
        .then(respnose => respnose.data);
    },
    getNotifications(page, take){
        return instance.get(`/notifications?page=${page}&take=${take}`)
        .then(response => response.data);
    }

}

export const programsApi = {
    getPrograms(organizationId, pageId, perPage){
        return instance.get(`programs?organizationId=${organizationId}&pageId=${pageId}&recordsPerPage=${perPage}`)
        .then(response => response.data);
    }
}