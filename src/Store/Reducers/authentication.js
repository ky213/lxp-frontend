import { AUTH_TOKEN_KEY } from '../../Config/constants';
import { REQUEST, SUCCESS, FAILURE } from '../../Utils/actionTypes';

const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
};

const initialState = {
  loading: false,
  isAuthenticated: false,
  account: null,
  error: null,
  token: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(ACTION_TYPES.LOGIN): {
      return { ...state, loading: true };
    }
    case SUCCESS(ACTION_TYPES.LOGIN): {
      return { ...state, loading: false, isAuthenticated: true, token: payload.token, account: payload.user };
    }
    case FAILURE(ACTION_TYPES.LOGIN): {
      return { ...state, loading: false, isAuthenticated: false, error: payload.error };
    }
    case REQUEST(ACTION_TYPES.LOGOUT): {
      return { ...state, loading: true };
    }
    case SUCCESS(ACTION_TYPES.LOGOUT): {
      return { ...state, loading: false, isAuthenticated: false, token: null, account: null };
    }
    case FAILURE(ACTION_TYPES.LOGOUT): {
      return { ...state, loading: false, error: payload.error };
    }

    default:
      return state;
  }
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
