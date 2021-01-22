import * as notificationService from 'Services/notifications';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

const NOTIFICATIONS_ACTIONS = {
  GET_ALL: 'notifications/GET_ALL',
  GET_ONE: 'notifications/GET_ONE',
  GET_UNREAD: 'notifications/GET_UNREAD',
  DELETE: 'notifications/DELETE',
  RESET: 'notifications/RESET',
};

let initialState = {
  unreadNotifications: [],
  totalUnreadNotificationsCount: 0,
  notifications: [],
  totalNotificationsCount: 0,
  limit: 5,
  currentPage: 1,
  pageSize: 15,
  error: null,
  loading: false,
};

const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(NOTIFICATIONS_ACTIONS.GET_ALL):
    case REQUEST(NOTIFICATIONS_ACTIONS.GET_UNREAD): {
      return { ...state, loading: true, error: null };
    }

    case FAILURE(NOTIFICATIONS_ACTIONS.GET_ALL):
    case FAILURE(NOTIFICATIONS_ACTIONS.GET_UNREAD): {
      return { ...state, loading: false, error: payload.error };
    }

    case SUCCESS(NOTIFICATIONS_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        notifications: payload.data.notifications,
        totalNotificationsCount: payload.data.totalNotificationsCount,
      };
    }
    case SUCCESS(NOTIFICATIONS_ACTIONS.GET_UNREAD): {
      return {
        ...state,
        loading: false,
        unreadNotifications: payload.data.unreadNotifications,
        totalUnreadNotificationsCount: payload.data.totalUnreadNotificationsCount,
      };
    }

    case NOTIFICATIONS_ACTIONS.RESET: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export const getUnreadNotifications = (limit, selectedOrganizationId) => async dispatch => {
  dispatch({
    type: NOTIFICATIONS_ACTIONS.GET_UNREAD,
    payload: notificationService.getUnreadNotifications(limit, selectedOrganizationId),
  });
};

export const getNotifications = (currentPage, pageSize) => dispatch => {
  dispatch({
    type: NOTIFICATIONS_ACTIONS.GET_ALL,
    payload: notificationService.getNotifications(currentPage, pageSize),
  });
};

export default notificationsReducer;
