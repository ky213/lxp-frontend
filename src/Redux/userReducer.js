import { userApi } from "../Api/api";
import { setIsFetching } from "./commonReducer";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_IS_AUTH = 'SET_IS_AUTH';

let initialState = {
    user: [],
    isAuth: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA: {
            return { ...state, user: action.user }
        }
        case SET_IS_AUTH: {
            return { ...state, isAuth: action.isAuth }
        }
        default:
            return state;
    }
}

export const setUserData = (user) => ({
    type: SET_USER_DATA, user
});

export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH, isAuth
});

export const login = (email, password) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let response = await userApi.login(email, password);
        localStorage.setItem('usertoken', response.token);
        dispatch([setUserData(response.user), setIsAuth(true), setIsFetching(false)]);
    }catch(err){
        dispatch(setIsFetching(false));
    }
}


export default userReducer;