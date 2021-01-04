import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.staging.lxpia.com/api'
    
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
    }
}

export const programsApi = {
    getPrograms(organizationId){
        return instance.get(`programs/currentuser?organizationId=${organizationId}`)
        .then(response => response.data);
    }
}