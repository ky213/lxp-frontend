import { lessonsService } from 'Services';

import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const LESSONS_ACTIONS = {
  GET_ALL: 'courses/GET_ALL',
  GET_ONE: 'courses/GET_ONE',
  CREATE: 'courses/CREATE',
  UPDATE: 'courses/UPDATE',
  DELETE: 'courses/DELETE',
  RESET: 'courses/RESET',
};

const initialState = {
  lessons: [],
  currentLesson: null,
  totalNumberOfRecords: 0,
  loading: false,
  success: false,
  error: null,
};

const coursesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(LESSONS_ACTIONS.GET_ALL):
    case REQUEST(LESSONS_ACTIONS.GET_ONE):
    case REQUEST(LESSONS_ACTIONS.CREATE):
    case REQUEST(LESSONS_ACTIONS.UPDATE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(LESSONS_ACTIONS.GET_ALL):
    case FAILURE(LESSONS_ACTIONS.GET_ONE):
    case FAILURE(LESSONS_ACTIONS.CREATE):
    case FAILURE(LESSONS_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: false, error: payload.error };
    }
    case SUCCESS(LESSONS_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        courses: payload.data.courses,
        totalNumberOfRecords: payload.data.totalNumberOfCourses,
      };
    }
    case SUCCESS(LESSONS_ACTIONS.GET_ONE): {
      return { ...state, loading: false, currentCourse: payload.data };
    }
    case SUCCESS(LESSONS_ACTIONS.CREATE):
    case SUCCESS(LESSONS_ACTIONS.UPDATE): {
      return { ...state, loading: false, success: true };
    }
    case LESSONS_ACTIONS.RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const getCourseLessons = (organizationId, courseId) => async dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.GET_ALL,
    payload: lessonsService.getCoursesLesson(organizationId, courseId),
  });
};

export const getOneLessons = (organizationId, lessonId) => async dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.GET_ONE,
    payload: lessonsService.getOneLessons(organizationId, lessonId),
  });
};

export const createLesson = lessonData => dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.CREATE,
    payload: lessonsService.createLesson(lessonData),
  });
};

export const updateLesson = courseData => dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.UPDATE,
    payload: lessonsService.updateLesson(courseData),
  });
};

export const deleteLesson = (organizationId, lessonId) => dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.DELETE,
    payload: lessonsService.deleteLesson(organizationId, lessonId),
  });
};

export const resetCoursesState = () => ({ type: LESSONS_ACTIONS.RESET });

export default coursesReducer;
