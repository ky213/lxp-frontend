const SET_IS_FETCHING = 'SET_IS_FETCHING';

let initialState = {
    isFetching: false
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state
    }
} 

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});

export default commonReducer;
