import { SELECT_PROGRAM } from '@/actions';

export const selectedProgramReducer = (state, action) => {
  switch (action.type) {
    case SELECT_PROGRAM:
      return { ...state, selectedProgram: action.selectedProgram };

    default:
      return state;
  }
};
