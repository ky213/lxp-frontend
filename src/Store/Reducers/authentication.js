import * as authenticationSerivce from 'Services/authentication';

import { AUTH_TOKEN_KEY } from 'Config/constants'; //local storage key
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
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
    case REQUEST(ACTION_TYPES.LOGOUT): {
      return { ...state, loading: true, error: null };
    }

    case FAILURE(ACTION_TYPES.LOGOUT):
    case FAILURE(ACTION_TYPES.LOGIN): {
      return { ...state, loading: false, isAuthenticated: false, error: payload.error };
    }

    case SUCCESS(ACTION_TYPES.LOGIN): {
      return { ...state, loading: false, isAuthenticated: true, token: payload.data.token, profile: payload.data.user };
    }
    case SUCCESS(ACTION_TYPES.LOGOUT): {
      return { ...state, loading: false, isAuthenticated: false, token: null, profile: null };
    }
    default:
      return state;
  }
};

export const login = (email, password) => dispatch => {
  dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: authenticationSerivce.login(email, password),
  });
};

export const clearAuthToken = () => {
  if (sessionStorage.get(AUTH_TOKEN_KEY)) sessionStorage.remove(AUTH_TOKEN_KEY);

  if (localStorage.get(AUTH_TOKEN_KEY)) localStorage.remove(AUTH_TOKEN_KEY);
};

export const clearAuthentication = dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export default reducer;
