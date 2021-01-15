const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false,
  account: null,
  error: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return { ...state, user: action.user };
    }
    case 'SET_IS_AUTH': {
      return { ...state, isAuth: action.isAuth };
    }
    case 'SET_IS_START_DATA': {
      return { ...state, isStartData: action.isStartData };
    }

    default:
      return state;
  }
};

export default reducer;
