import * as programsService from 'Services/programs';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

const PROGRAMS_ACTIONS = {
  GET_ALL: 'programs/GET_ALL',
  GET_ONE: 'programs/GET_ONE',
  CREATE: 'programs/CREATE',
  UPDATE: 'programs/UPDATE',
  DELETE: 'programs/DELETE',
  RESET: 'programs/RESET',
};

const initialState = {
  programs: [],
  currentProgram: null,
  programDirectors: [],
  totalNumberOfRecords: 0,
  loading: false,
  error: null,
};

const programsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(PROGRAMS_ACTIONS.GET_ALL):
    case REQUEST(PROGRAMS_ACTIONS.GET_ONE): {
      return { ...state, loading: true, error: null };
    }

    case FAILURE(PROGRAMS_ACTIONS.GET_ALL):
    case FAILURE(PROGRAMS_ACTIONS.GET_ONE): {
      return { ...state, loading: false, error: payload.error };
    }

    case SUCCESS(PROGRAMS_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        programs: payload.data.programs,
        totalNumberOfRecords: payload.data.totalNumberOfRecords,
      };
    }
    case SUCCESS(PROGRAMS_ACTIONS.GET_ONE): {
      return { ...state, loading: false, currentProgram: payload.data };
    }
    case PROGRAMS_ACTIONS.RESET: {
      return { ...initialState };
    }

    default:
      return state;
  }
};

export const getPrograms = (organizationId, pageId, perPage) => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.GET_ALL,
    payload: programsService.getPrograms(organizationId, pageId, perPage),
  });
};
export const setCurrentProgram = (organizationId, pageId, perPage) => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.GET_ALL,
    payload: programsService.getPrograms(organizationId, pageId, perPage),
  });
};

export default programsReducer;
