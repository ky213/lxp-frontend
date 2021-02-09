import * as activitiesService from 'Services/activities';
import * as commonService from 'Services/common';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const ACTIVITIES_ACTIONS = {
  GET_ALL: 'activities/GET_ALL',
  GET_ONE: 'activities/GET_ONE',
  GET_ACTIVITY_TYPES: 'activities/GET_ACTIVITY_TYPES',
  CREATE: 'activities/CREATE',
  UPDATE: 'activities/UPDATE',
  DELETE: 'activities/DELETE',
  ADD_ACTIVITY_LINK: 'activities/ADD_ACTIVITY_LINK',
  ADD_ACTIVITY_FILE: 'activities/ADD_ACTIVITY_FILE',
  ACTIVITY_UPLOAD_FILE: 'activities/ACTIVITY_UPLOAD_FILE',
  RESET: 'activities/RESET',
};

const initialState = {
  allActivities: [],
  activityTypes: [],
  currentActivity: null,
  totalNumberOfRecords: 0,
  loading: false,
  success: false,
  error: null,
};

const activitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(ACTIVITIES_ACTIONS.GET_ALL):
    case REQUEST(ACTIVITIES_ACTIONS.GET_ONE):
    case REQUEST(ACTIVITIES_ACTIONS.GET_ACTIVITY_TYPES):
    case REQUEST(ACTIVITIES_ACTIONS.CREATE):
    case REQUEST(ACTIVITIES_ACTIONS.UPDATE):
    case REQUEST(ACTIVITIES_ACTIONS.ADD_ACTIVITY_LINK):
    case REQUEST(ACTIVITIES_ACTIONS.ADD_ACTIVITY_FILE):
    case REQUEST(ACTIVITIES_ACTIONS.ACTIVITY_UPLOAD_FILE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(ACTIVITIES_ACTIONS.GET_ALL):
    case FAILURE(ACTIVITIES_ACTIONS.GET_ONE):
    case FAILURE(ACTIVITIES_ACTIONS.GET_ACTIVITY_TYPES):
    case FAILURE(ACTIVITIES_ACTIONS.CREATE):
    case FAILURE(ACTIVITIES_ACTIONS.UPDATE):
    case FAILURE(ACTIVITIES_ACTIONS.ADD_ACTIVITY_LINK):
    case FAILURE(ACTIVITIES_ACTIONS.ADD_ACTIVITY_FILE):
    case FAILURE(ACTIVITIES_ACTIONS.ACTIVITY_UPLOAD_FILE): {
      return { ...state, loading: false, success: false, error: payload.error };
    }

    case SUCCESS(ACTIVITIES_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        allActivities: payload.data,
      };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.GET_ACTIVITY_TYPES): {
      return {
        ...state,
        loading: false,
        activityTypes: payload.data,
      };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.GET_ONE): {
      return { ...state, loading: false, currentActivity: payload.data };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.CREATE): {
      return { ...state, currentActivity: payload.data, loading: false, success: true };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: true };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.ADD_ACTIVITY_LINK):
    case SUCCESS(ACTIVITIES_ACTIONS.ADD_ACTIVITY_FILE):
    case SUCCESS(ACTIVITIES_ACTIONS.ACTIVITY_UPLOAD_FILE): {
      return { ...state, loading: false, success: true };
    }
    case ACTIVITIES_ACTIONS.RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const getActivities = (organizationId, employeeId, userId, from, to) => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.GET_ALL,
    payload: activitiesService.getActivities(organizationId, employeeId, userId, from, to),
  });
};

export const getActivitiesByLearner = (organizationId, employeeId, userId) => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.GET_ALL,
    payload: activitiesService.getActivitiesByLearner(organizationId, employeeId, userId),
  });
};
export const getActivityTypes = organizationId => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.GET_ACTIVITY_TYPES,
    payload: activitiesService.getActivityTypes(organizationId),
  });
};

export const getOneActivity = (organizationId, activityId) => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.GET_ONE,
    payload: activitiesService.getOneActivity(organizationId, activityId),
  });
};
export const createActivity = activityData => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.CREATE,
    payload: activitiesService.createActivity(activityData),
  });
};

export const updateActivity = activityData => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.UPDATE,
    payload: activitiesService.updateActivity(activityData),
  });
};

export const deleteActivity = activityId => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.DELETE,
    payload: activitiesService.deleteActivity(activityId),
  });
};

export const addActivityLink = (organizationId, activityId, url) => async dispatch => {
  const { value } = await dispatch({
    type: ACTIVITIES_ACTIONS.ADD_ACTIVITY_LINK,
    payload: activitiesService.addActivityLink(activityId, url),
  });

  if (value.data[0])
    dispatch({
      type: ACTIVITIES_ACTIONS.GET_ONE,
      payload: activitiesService.getOneActivity(organizationId, activityId),
    });
};
export const addActivityFile = (organizationId, formData, file) => async dispatch => {
  const { value } = await dispatch({
    type: ACTIVITIES_ACTIONS.ADD_ACTIVITY_FILE,
    payload: activitiesService.addActivityFile(organizationId, formData),
  });

  if (value.data.activityFileId)
    dispatch({
      type: ACTIVITIES_ACTIONS.ACTIVITY_UPLOAD_FILE,
      payload: commonService.uploadFile(value.data.url, file),
    });
};

export const resetActivitiesState = () => ({
  type: ACTIVITIES_ACTIONS.RESET,
});

export default activitiesReducer;
