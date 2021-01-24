import * as authenticationSerivce from 'Services/authentication';

import { AUTH_TOKEN_KEY } from 'Config/constants'; //local storage key
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  GET_USER_PROFILE: 'authentication/GET_USER_PROFILE',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  profile: {},
  error: null,
  token: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_USER_PROFILE): {
      return { ...state, loading: true, error: null };
    }

    case FAILURE(ACTION_TYPES.LOGOUT):
    case FAILURE(ACTION_TYPES.GET_USER_PROFILE): {
      return { ...state, loading: false, isAuthenticated: false, error: payload.error };
    }

    case SUCCESS(ACTION_TYPES.LOGIN):
    case SUCCESS(ACTION_TYPES.GET_USER_PROFILE): {
      return { ...state, loading: false, isAuthenticated: true, token: payload.data.token, profile: payload.data.user };
    }
    case ACTION_TYPES.LOGOUT: {
      return { ...state, loading: false, isAuthenticated: false, token: null, profile: {} };
    }
    default:
      return state;
  }
};

export const login = (email, password, rememberMe = false) => async dispatch => {
  const { value } = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: authenticationSerivce.login(email, password),
  });
  const token = value?.data?.token;

  if (token) {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    if (rememberMe) localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};
export const logout = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
  clearAuthToken();
};

export const getUserProfile = token => dispatch => {
  dispatch({
    type: ACTION_TYPES.GET_USER_PROFILE,
    payload: authenticationSerivce.getUserProfile(token),
  });
};

export const clearAuthToken = () => {
  if (sessionStorage.getItem(AUTH_TOKEN_KEY)) sessionStorage.removeItem(AUTH_TOKEN_KEY);

  if (localStorage.getItem(AUTH_TOKEN_KEY)) localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const clearAuthentication = dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export default reducer;
