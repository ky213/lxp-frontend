import { activitiesApi } from '../../Services/api';
import { setIsFetching } from './common';

const SET_CURRENT_ACTIVITY = 'SET_CURRENT_ACTIVITY';
const SET_ACTIVITIES_DATA = 'SET_ACTIVITIES_DATA';

let initialState = {
  activities: [],
  currentActivity: null,
};

const activitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ACTIVITY: {
      return { ...state, currentActivity: action.currentActivity };
    }
    case SET_ACTIVITIES_DATA: {
      return { ...state, activities: action.activities };
    }
    default:
      return state;
  }
};

export const setCurrentActivity = currentActivity => ({
  type: SET_CURRENT_ACTIVITY,
  currentActivity,
});
export const setActivitiesData = activities => ({
  type: SET_ACTIVITIES_DATA,
  activities,
});

export const getActivities = (employeeId, userId, organizationId) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let response = await activitiesApi.getActivities(employeeId, userId, organizationId);
    dispatch([setActivitiesData(response), setIsFetching(false)]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export const getActivity = (activityId, selectedOrganizationId) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let respnose = await activitiesApi.getActivity(activityId, selectedOrganizationId);
    dispatch([setCurrentActivity(respnose), setIsFetching(false)]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export default activitiesReducer;
