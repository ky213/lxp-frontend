import { SUPER_ADMIN_SELECT_ORGANIZATION, SUPER_ADMIN_UPDATE_ORGANIZATION } from "@/actions";

export const organizationReducer = (state, action) => {
    console.log("Organization reducer: ", state, action);
    switch (action.type) {
        case SUPER_ADMIN_SELECT_ORGANIZATION:
            return { ...state, selectedOrganization: action.selectedOrganization };

        case SUPER_ADMIN_UPDATE_ORGANIZATION:
            const selected = state.selectedOrganization;
            if(selected && selected.organizationId == action.organization.organizationId) {
                return { ...state, selectedOrganization: action.organization };
            }
            return state;

        default:
            return state;
      
    }
};