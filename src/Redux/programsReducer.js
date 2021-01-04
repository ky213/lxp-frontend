import { programsApi } from "../Api/api";
import { setIsFetching } from "./commonReducer";

const SET_PROGRAMS_DATA = 'SET_PROGRAMS_DATA';

let initialState = {
    programs: [],
}

const programsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PROGRAMS_DATA: {
            return { ...state, programs: action.programs }
        }
        default:
            return state;
    }
}

export const setProgramsData = (programs) => ({
    type: SET_PROGRAMS_DATA, programs
});

export const getPrograms = (organizationId) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let respnose = await programsApi.getPrograms(organizationId);
        console.log(respnose);
        dispatch([setIsFetching(false)]);
    }catch(err){
        dispatch(setIsFetching(false));
    }
}


export default programsReducer;