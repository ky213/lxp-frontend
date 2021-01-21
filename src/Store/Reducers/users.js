import { userService } from 'Services';
import { setIsFetching } from './common';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_IS_START_DATA = 'SET_IS_START_DATA';
const SET_EMPLOYEE_ID = 'SET_EMPLOYEE_ID';

const initialState = {
  user: [],
  isAuth: false,
  isStartData: false,
  employeeId: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, user: action.user };
    }
    case SET_IS_AUTH: {
      return { ...state, isAuth: action.isAuth };
    }
    case SET_IS_START_DATA: {
      return { ...state, isStartData: action.isStartData };
    }
    case SET_EMPLOYEE_ID: {
      return { ...state, employeeId: action.employeeId };
    }
    default:
      return state;
  }
};

export const setUserData = user => ({
  type: SET_USER_DATA,
  user,
});

export const setIsAuth = isAuth => ({
  type: SET_IS_AUTH,
  isAuth,
});
export const setIsStartData = isStartData => ({
  type: SET_IS_START_DATA,
  isStartData,
});
export const setEmployeeId = employeeId => ({
  type: SET_EMPLOYEE_ID,
  employeeId,
});

// export const login = (email, password, isRememberMe) => async dispatch => {
//   dispatch(setIsFetching(true));
//   try {
//     let response = await userService.login(email, password);
//     if (isRememberMe) {
//       localStorage.setItem('usertoken', response.token);
//     } else {
//       sessionStorage.setItem('usertoken', response.token);
//     }
//     dispatch([setEmployeeId(response.user.employeeId), setIsAuth(true), setIsFetching(false)]);
//   } catch (err) {
//     let error = err.response.data.message ? err.response.data.message : err.message;
//     dispatch(stopSubmit('login', { _error: error }));
//     dispatch(setIsFetching(false));
//   }
// };

export const getProfile = token => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let response = await userService.getProfile(token);
    dispatch([
      setUserData(response.user),
      setEmployeeId(response.user.employeeId),
      setIsAuth(true),
      setIsFetching(false),
    ]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export const getUserProfile = employeeId => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    let respnose = await userService.getUserProfile(employeeId);
    dispatch([setUserData(respnose), setIsFetching(false)]);
  } catch (err) {
    dispatch(setIsFetching(false));
  }
};

export const logout = () => async dispatch => {
  dispatch([setIsFetching(true), setIsAuth(false), setIsStartData(false), setUserData([])]);
  localStorage.removeItem('usertoken');
  sessionStorage.removeItem('usertoken');
  dispatch(setIsFetching(false));
};

export default usersReducer;
