import { notificationsApi } from '../../Services/api';
import { setIsFetching } from './common';

const SET_UNREAD_NOTIFICATIONS_DATA = 'SET_UNREAD_NOTIFICATIONS_DATA';
const SET_TOTAL_UNREAD_NOTIFICATIONS_COUNT = 'SET_TOTAL_UNREAD_NOTIFICATIONS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_NOTIFICATIONS_DATA = 'SET_NOTIFICATIONS_DATA';
const SET_TOTAL_NOTIFICATIONS_COUNT = 'SET_TOTAL_NOTIFICATIONS_COUNT';

let initialState = {
  unreadNotifications: [],
  totalUnreadNotificationsCount: 0,
  notifications: [],
  totalNotificationsCount: 0,
  limit: 5,
  currentPage: 1,
  pageSize: 15,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_UNREAD_NOTIFICATIONS_DATA: {
      return { ...state, unreadNotifications: action.unreadNotifications };
    }
    case SET_TOTAL_UNREAD_NOTIFICATIONS_COUNT: {
      return { ...state, totalUnreadNotificationsCount: action.totalUnreadNotificationsCount };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_PAGE_SIZE: {
      return { ...state, pageSize: action.pageSize };
    }
    case SET_NOTIFICATIONS_DATA: {
      return { ...state, notifications: action.notifications };
    }
    case SET_TOTAL_NOTIFICATIONS_COUNT: {
      return { ...state, totalNotificationsCount: action.totalNotificationsCount };
    }
    default:
      return state;
  }
};

export const setUnreadNotificationsData = unreadNotifications => ({
  type: SET_UNREAD_NOTIFICATIONS_DATA,
  unreadNotifications,
});
export const setTotalUnreadNotificationsCount = totalUnreadNotificationsCount => ({
  type: SET_TOTAL_UNREAD_NOTIFICATIONS_COUNT,
  totalUnreadNotificationsCount,
});
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setPageSize = pageSize => ({
  type: SET_PAGE_SIZE,
  pageSize,
});
export const setNotificationsData = notifications => ({
  type: SET_NOTIFICATIONS_DATA,
  notifications,
});
export const setTotatlNotificationsCount = totalNotificationsCount => ({
  type: SET_TOTAL_NOTIFICATIONS_COUNT,
  totalNotificationsCount,
});

export const getUnreadNotifications = (limit, selectedOrganizationId) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let respnose = await notificationsApi.getUnreadNotifications(limit, selectedOrganizationId);
    dispatch([
      setTotalUnreadNotificationsCount(respnose.totalUnreadCount),
      setUnreadNotificationsData(respnose.unreadNotifications),
      setIsFetching(false),
    ]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export const getNotifications = (currentPage, pageSize) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let response = await notificationsApi.getNotifications(currentPage, pageSize);
    console.log(response);
    dispatch([
      setNotificationsData(response.notifications),
      setTotatlNotificationsCount(response.totalNumberOfRecords),
      setIsFetching(false),
    ]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export default notificationsReducer;
