import { lessonsService, commonService } from 'Services';

import { REQUEST, SUCCESS, FAILURE } from 'Utils/actionTypes';

export const LESSONS_ACTIONS = {
  GET_ALL: 'lessons/GET_ALL',
  GET_ONE: 'lessons/GET_ONE',
  CREATE: 'lessons/CREATE',
  UPDATE: 'lessons/UPDATE',
  DELETE: 'lessons/DELETE',
  UPLOAD_FILE: 'lessons/UPLOAD_FILE',
  RESET: 'lessons/RESET',
};

const initialState = {
  lessons: [],
  currentLesson: null,
  totalNumberOfRecords: 0,
  loading: false,
  success: false,
  error: null,
};

const lessonsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST(LESSONS_ACTIONS.GET_ALL):
    case REQUEST(LESSONS_ACTIONS.GET_ONE):
    case REQUEST(LESSONS_ACTIONS.CREATE):
    case REQUEST(LESSONS_ACTIONS.UPDATE):
    case REQUEST(LESSONS_ACTIONS.UPLOAD_FILE): {
      return { ...state, loading: true, success: false, error: null };
    }

    case FAILURE(LESSONS_ACTIONS.GET_ALL):
    case FAILURE(LESSONS_ACTIONS.GET_ONE):
    case FAILURE(LESSONS_ACTIONS.CREATE):
    case FAILURE(LESSONS_ACTIONS.UPDATE):
    case FAILURE(LESSONS_ACTIONS.UPLOAD_FILE): {
      return { ...state, loading: false, success: false, error: payload.error };
    }
    case SUCCESS(LESSONS_ACTIONS.GET_ALL): {
      return {
        ...state,
        loading: false,
        lessons: payload.data.lessons,
        totalNumberOfRecords: payload.data.totalNumberOfCourses,
      };
    }
    case SUCCESS(LESSONS_ACTIONS.GET_ONE): {
      return { ...state, loading: false, currentLesson: payload.data };
    }
    case SUCCESS(LESSONS_ACTIONS.CREATE):
    case SUCCESS(LESSONS_ACTIONS.UPDATE):
    case SUCCESS(LESSONS_ACTIONS.UPLOAD_FILE): {
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

export const getOneLesson = (organizationId, lessonId) => async dispatch => {
  dispatch({
    type: LESSONS_ACTIONS.GET_ONE,
    payload: lessonsService.getOneLesson(organizationId, lessonId),
  });
};

export const createLesson = (lessonData, file) => async dispatch => {
  const { value } = await dispatch({
    type: LESSONS_ACTIONS.CREATE,
    payload: lessonsService.createLesson(lessonData),
  });

  dispatch({
    type: LESSONS_ACTIONS.UPLOAD_FILE,
    payload: commonService.uploadFile(value.data.uploadUrl, file),
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

export const resetLessonsState = () => ({ type: LESSONS_ACTIONS.RESET });

export default lessonsReducer;
