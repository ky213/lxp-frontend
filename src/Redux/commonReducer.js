const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_DIRECTION = 'SET_DIRECTION';
const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE'; 

let initialState = {
    isFetching: false,
    direction: "ltr",
    currentRoute: "/"
}

const commonReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_DIRECTION: {
            return { ...state, direction: action.direction }
        }
        case SET_CURRENT_ROUTE: {
            return { ...state, currentRoute: action.currentRoute }
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
export const setCurrentRoute = (currentRoute) => ({
    type: SET_CURRENT_ROUTE, currentRoute
});

export default commonReducer;
