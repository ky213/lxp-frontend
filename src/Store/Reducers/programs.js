import { programsApi } from "../../Services/api";
import { setIsFetching } from "./common";

const SET_PROGRAMS_DATA = 'SET_PROGRAMS_DATA';
const SET_PAGE_ID = 'SET_PAGE_ID';
const SET_PER_PAGE = 'SET_PER_PAGE';
const SET_TOTAL_PROGRAMS_COUNT = 'SET_TOTAL_PROGRAMS_COUNT';

let initialState = {
    programs: [],
    totalProgramsCount: 0,
    pageId: 1,
    perPage: 15
}

const programsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PROGRAMS_DATA: {
            return { ...state, programs: action.programs }
        }
        case SET_PAGE_ID: {
            return { ...state, pageId: action.pageId }
        }
        case SET_PER_PAGE: {
            return { ...state, perPage: action.perPage }
        }
        case SET_TOTAL_PROGRAMS_COUNT: {
            return { ...state, totalProgramsCount: action.totalProgramsCount }
        }
        default:
            return state;
    }
}

export const setProgramsData = (programs) => ({
    type: SET_PROGRAMS_DATA, programs
});
export const setPageId = (pageId) => ({
    type: SET_PAGE_ID, pageId
});
export const setPerPage = (perPage) => ({
    type: SET_PER_PAGE, perPage
});
export const setTotalProgramsCount = (totalProgramsCount) => ({
    type: SET_TOTAL_PROGRAMS_COUNT, totalProgramsCount
});

export const getPrograms = (organizationId, pageId, perPage) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let respnose = await programsApi.getPrograms(organizationId, pageId, perPage);
        dispatch([setProgramsData(respnose.programs), setTotalProgramsCount(respnose.totalProgramsCount), setIsFetching(false)]);
    }catch(err){
        dispatch(setIsFetching(false));
    }
}


export default programsReducer;