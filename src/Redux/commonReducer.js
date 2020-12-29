const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_DIRECTION = 'SET_DIRECTION';

let initialState = {
    isFetching: false,
    direction: "ltr",
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_DIRECTION: {
            return { ...state, direction: action.direction }
        }
        default:
            return state
    }
} 

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
});
export const setDirection = (direction) => ({
    type: SET_DIRECTION, direction
});

export default commonReducer;
