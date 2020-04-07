import { currentUserReducer } from './CurrentUserReducer';
import { selectedProgramReducer } from './SelectedProgramReducer';
import { academicYearReducer } from './AcademicYearReducer';
import { instituteReducer } from './InstituteReducer';
import {combineReducers} from '@/helpers';

const reducers = (state, action) => {
    console.log("Triggered main reducer:", state, action)
    /*
    let newState = {
        ...state,
        ...currentUserReducer(state, action),
        ...selectedProgramReducer(state, action),
        ...academicYearReducer(state, action),
        ...instituteReducer(state, action)
    };
    */

    const currentUserState = currentUserReducer(state, action);
    const selectedProgramState = selectedProgramReducer(currentUserState, action);
    const selectedInstituteState = instituteReducer(selectedProgramState, action);
    const academicYearState = academicYearReducer(selectedInstituteState, action);

         
    const newState = {
        ...currentUserState,
        ...selectedProgramState,
        ...selectedInstituteState,
        ...academicYearState
    }
    console.log("Finished main reducer:", newState, action)
    return newState;
} 

export default reducers;