import { coursesApi } from '../Api/api';
import img1 from '../Assets/Images/Mocks/img1.jpg';
import img2 from '../Assets/Images/Mocks/img2.jpg';
import { setIsFetching } from './commonReducer';

const SET_COURSES_DATA = 'SET_COURSES_DATA';
const SET_JOINED_COURSES = 'SET_JOINED_COURSES';

let initialState = {
    courses: [],
    page: 1,
    take: 20,
    joinedCourses: []
}

const coursesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_COURSES_DATA: {
            return { ...state, courses: action.courses }
        }
        case SET_JOINED_COURSES: {
            return { ...state, joinedCourses: action.joinedCourses }
        }
        default:
            return state;
    }
}

export const setCoursesData = (courses) => ({
    type: SET_COURSES_DATA, courses
});
export const setJoinedCourses = (joinedCourses) => ({
    type: SET_JOINED_COURSES, joinedCourses
});

export const getCourses = (organizationId, page, take) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let respnose = await coursesApi.getCourses(organizationId, page, take);
        dispatch([setCoursesData(respnose.courses), setIsFetching(false)]);
    }catch(err){
        dispatch(setIsFetching(false));
    }
}

export default coursesReducer;