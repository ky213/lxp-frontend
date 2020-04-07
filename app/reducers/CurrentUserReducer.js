import { LOGOUT_USER, LOGIN_USER_SUCCESS, USER_CHANGE_PROFILE_PHOTO } from "@/actions";
import {Role} from '@/helpers';

export const currentUserReducer = (state, action) => {
    //console.log("Current user reducer: ", state, action);
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            
            const newState = { ...state, currentUser: action.user };
            //console.log("Triggered login action", newState, action.user.user.role);

            if(action.user && action.user.user && action.user.user.role != Role.SuperAdmin) {
                return {
                    ...newState,
                    selectedInstitute: action.user.user.instituteId && {
                        instituteId:action.user.user.instituteId, 
                        name: action.user.user.instituteName,
                        colorCode: action.user.user.instituteForegroundColor,
                        backgroundColorCode: action.user.user.instituteBackgroundColor,
                        logo: action.user.user.instituteLogo
                    } || null
                }
            }

            return newState;

        case LOGOUT_USER: 
            console.log("Triggered logout action");
            return {...state, currentUser: null, selectedInstitute: null, academicYear: null, selectedProgram: null};

        case USER_CHANGE_PROFILE_PHOTO: 
            
            //console.log("Triggered change profile photo action");        
            let x = {
                ...state, 
                currentUser: {
                    ...state.currentUser, 
                    user: {
                            ...state.currentUser.user, 
                            profilePhoto: action.profilePhoto
                        }
                    }
                };

            return x;

        default:
            return state;
      
    }
};