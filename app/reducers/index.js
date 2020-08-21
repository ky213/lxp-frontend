import { currentUserReducer } from './CurrentUserReducer';
import { selectedProgramReducer } from './SelectedProgramReducer';
import { academicYearReducer } from './AcademicYearReducer';
import { organizationReducer } from './OrganizationReducer';
import { combineReducers } from '@/helpers';

const reducers = (state, action) => {
  /*
    let newState = {
        ...state,
        ...currentUserReducer(state, action),
        ...selectedProgramReducer(state, action),
        ...academicYearReducer(state, action),
        ...organizationReducer(state, action)
    };
    */

  const currentUserState = currentUserReducer(state, action);
  const selectedProgramState = selectedProgramReducer(currentUserState, action);
  const selectedOrganizationState = organizationReducer(
    selectedProgramState,
    action
  );
  const academicYearState = academicYearReducer(
    selectedOrganizationState,
    action
  );

  const newState = {
    ...currentUserState,
    ...selectedProgramState,
    ...selectedOrganizationState,
    ...academicYearState,
  };
  return newState;
};

export default reducers;
