import { SUPER_ADMIN_SELECT_INSTITUTE, SUPER_ADMIN_UPDATE_INSTITUTE } from "@/actions";

export const instituteReducer = (state, action) => {
    console.log("Institute reducer: ", state, action);
    switch (action.type) {
        case SUPER_ADMIN_SELECT_INSTITUTE:
            return { ...state, selectedInstitute: action.selectedInstitute };

        case SUPER_ADMIN_UPDATE_INSTITUTE:
            const selected = state.selectedInstitute;
            if(selected && selected.instituteId == action.institute.instituteId) {
                return { ...state, selectedInstitute: action.institute };
            }
            return state;

        default:
            return state;
      
    }
};