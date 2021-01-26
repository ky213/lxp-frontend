import { coursesService } from 'Services';
import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const COURSES_ACTIONS = {
  GET_ALL: 'courses/GET_ALL',
  GET_ONE: 'courses/GET_ONE',
  GET_JOINED_COURSES: 'courses/GET_JOINED_COURSES',
  CREATE: 'courses/CREATE',
  UPDATE: 'courses/UPDATE',
  DELETE: 'courses/DELETE',
  RESET: 'courses/RESET',
};

const initialState = {
  courses: [],
  joinedCourses: [],
  currentCourse: null,
  totalNumberOfRecords: 0,
  loading: false,
  success: false,
  error: null,
};

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(COURSES_ACTIONS.GET_ALL):
    case REQUEST(COURSES_ACTIONS.GET_ONE):
    case REQUEST(COURSES_ACTIONS.GET_JOINED_COURSES):
    case REQUEST(COURSES_ACTIONS.CREATE):
    case REQUEST(COURSES_ACTIONS.UPDATE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(COURSES_ACTIONS.GET_ALL):
    case FAILURE(COURSES_ACTIONS.GET_ONE):
    case FAILURE(COURSES_ACTIONS.GET_JOINED_COURSES):
    case FAILURE(COURSES_ACTIONS.CREATE):
    case FAILURE(COURSES_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: false, error: payload.error };
    }
    case SUCCESS(COURSES_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        courses: payload.data.courses,
        totalNumberOfRecords: payload.data.totalNumberOfCourses,
      };
    }
    case SUCCESS(COURSES_ACTIONS.GET_ONE): {
      return { ...state, loading: false, currentCourse: payload.data };
    }
    case SUCCESS(COURSES_ACTIONS.GET_JOINED_COURSES): {
      return { ...state, loading: false, joinedCourses: payload.data };
    }
    case SUCCESS(COURSES_ACTIONS.CREATE):
    case SUCCESS(COURSES_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: true };
    }
    case COURSES_ACTIONS.RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const getCourses = (organizationId, programId, page, take, filter) => async dispatch => {
  dispatch({
    type: COURSES_ACTIONS.GET_ALL,
    payload: coursesService.getCourses(organizationId, programId, page, take, filter),
  });
};

export const getJoinedCourses = (organizationId, page, take, filter) => async dispatch => {
  dispatch({
    type: COURSES_ACTIONS.GET_JOINED_COURSES,
    payload: coursesService.getJoinedCourses(organizationId, page, take, filter),
  });
};

export const createCourse = courseDate => dispatch => {
  dispatch({
    type: COURSES_ACTIONS.CREATE,
    payload: coursesService.createCourse(courseDate),
  });
};
export const updateCourse = courseDate => dispatch => {
  dispatch({
    type: COURSES_ACTIONS.UPDATE,
    payload: coursesService.updateCourse(courseDate),
  });
};

export const resetCoursesState = () => ({ type: COURSES_ACTIONS.RESET });

export default coursesReducer;
