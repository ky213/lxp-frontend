import { SELECT_ACADEMIC_YEAR } from '@/actions';

export const academicYearReducer = (state, action) => {
  switch (action.type) {
    case SELECT_ACADEMIC_YEAR:
      return { ...state, academicYear: action.selectedAcademicYear };

    default:
      return state;
  }
};
