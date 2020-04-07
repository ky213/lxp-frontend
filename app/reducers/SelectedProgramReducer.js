import { SELECT_PROGRAM } from "@/actions";

export const selectedProgramReducer = (state, action) => {
    console.log("Selected program reducer: ", state, action);
    switch (action.type) {
        case SELECT_PROGRAM:
            return { ...state, selectedProgram: action.selectedProgram };

        default:
            return state;
      
    }
};