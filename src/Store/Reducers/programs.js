import * as programsService from 'Services/programs';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const PROGRAMS_ACTIONS = {
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
  success: false,
  error: null,
};

const programsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(PROGRAMS_ACTIONS.GET_ALL):
    case REQUEST(PROGRAMS_ACTIONS.GET_ONE):
    case REQUEST(PROGRAMS_ACTIONS.CREATE):
    case REQUEST(PROGRAMS_ACTIONS.UPDATE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(PROGRAMS_ACTIONS.GET_ALL):
    case FAILURE(PROGRAMS_ACTIONS.GET_ONE):
    case FAILURE(PROGRAMS_ACTIONS.CREATE):
    case FAILURE(PROGRAMS_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: false, error: payload.error };
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
    case SUCCESS(PROGRAMS_ACTIONS.CREATE):
    case SUCCESS(PROGRAMS_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: true };
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

export const getOneProgram = (organizationId, programId) => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.GET_ONE,
    payload: programsService.getOneProgram(organizationId, programId),
  });
};
export const createProgram = programData => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.CREATE,
    payload: programsService.createProgram(programData),
  });
};

export const updateProgram = programData => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.UPDATE,
    payload: programsService.updateProgram(programData),
  });
};

export const setCurrentProgram = (organizationId, pageId, perPage) => dispatch => {
  dispatch({
    type: PROGRAMS_ACTIONS.GET_ALL,
    payload: programsService.getPrograms(organizationId, pageId, perPage),
  });
};

export const resetProgramsState = () => ({
  type: PROGRAMS_ACTIONS.RESET,
});

export default programsReducer;
