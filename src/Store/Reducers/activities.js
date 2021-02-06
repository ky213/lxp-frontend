import * as activitiesService from 'Services/activities';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const ACTIVITIES_ACTIONS = {
  GET_ALL: 'activities/GET_ALL',
  GET_ONE: 'activities/GET_ONE',
  GET_ACTIVITY_TYPES: 'activities/GET_ACTIVITY_TYPES',
  CREATE: 'activities/CREATE',
  UPDATE: 'activities/UPDATE',
  DELETE: 'activities/DELETE',
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
    case REQUEST(ACTIVITIES_ACTIONS.UPDATE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(ACTIVITIES_ACTIONS.GET_ALL):
    case FAILURE(ACTIVITIES_ACTIONS.GET_ONE):
    case FAILURE(ACTIVITIES_ACTIONS.GET_ACTIVITY_TYPES):
    case FAILURE(ACTIVITIES_ACTIONS.CREATE):
    case FAILURE(ACTIVITIES_ACTIONS.UPDATE): {
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
    case SUCCESS(ACTIVITIES_ACTIONS.GET_ONE):
    case SUCCESS(ACTIVITIES_ACTIONS.UPDATE): {
      return { ...state, loading: false, currentActivity: payload.data };
    }
    case SUCCESS(ACTIVITIES_ACTIONS.CREATE): {
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

export const getOneActivity = (organizationId, programId) => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.GET_ONE,
    payload: activitiesService.getOneActivity(organizationId, programId),
  });
};
export const createActivity = programData => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.CREATE,
    payload: activitiesService.createActivity(programData),
  });
};

export const updateActivity = programData => dispatch => {
  dispatch({
    type: ACTIVITIES_ACTIONS.UPDATE,
    payload: activitiesService.updateActivity(programData),
  });
};

export const resetActivitiesState = () => ({
  type: ACTIVITIES_ACTIONS.RESET,
});

export default activitiesReducer;
