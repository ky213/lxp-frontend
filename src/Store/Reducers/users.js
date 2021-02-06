import { usersService } from 'Services';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const USERS_ACTIONS = {
  GET_ALL: 'users/GET_ALL',
  GET_ONE: 'users/GET_ONE',
  GET_PROGRAM_DIRECTORS: 'users/GET_PROGRAM_DIRECTORS',
  CREATE: 'users/CREATE',
  UPDATE: 'users/UPDATE',
  DELETE: 'users/DELETE',
  RESET: 'users/RESET',
};

const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(USERS_ACTIONS.GET_ALL):
    case REQUEST(USERS_ACTIONS.GET_ONE):
    case REQUEST(USERS_ACTIONS.GET_PROGRAM_DIRECTORS): {
      return { ...state, loading: true, error: null };
    }
    case FAILURE(USERS_ACTIONS.GET_ALL):
    case FAILURE(USERS_ACTIONS.GET_ONE):
    case FAILURE(USERS_ACTIONS.GET_PROGRAM_DIRECTORS): {
      return { ...state, loading: false, error: payload };
    }
    case SUCCESS(USERS_ACTIONS.GET_ALL):
    case SUCCESS(USERS_ACTIONS.GET_ONE):
    case SUCCESS(USERS_ACTIONS.GET_PROGRAM_DIRECTORS): {
      return { ...state, loading: false, users: payload.data.users };
    }
    default:
      return state;
  }
};

export const getPorgramDirectors = (organizationId, name, pageId, recordsPerPage) => dispatch => {
  dispatch({
    type: USERS_ACTIONS.GET_PROGRAM_DIRECTORS,
    payload: usersService.getPorgramDirectors(organizationId, name, pageId, recordsPerPage),
  });
};

export const getActiveLearners = (organizationId, programId) => dispatch => {
  dispatch({
    type: USERS_ACTIONS.GET_ALL,
    payload: usersService.getActiveLearners(organizationId, programId),
  });
};

export default usersReducer;
