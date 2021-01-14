const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_DIRECTION = "SET_DIRECTION";
const SET_CURRENT_ROUTE = "SET_CURRENT_ROUTE";
const SET_SERVER_MESSAGE = "SET_SERVER_MESSAGE";
const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
const SET_LANGUAGE = "SET_LANGUAGE";

let initialState = {
  isFetching: false,
  direction: "ltr",
  currentLanguage: "en",
  currentRoute: "/",
  serverMessage: null,
  searchValue: "",
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case SET_DIRECTION: {
      return { ...state, direction: action.direction };
    }
    case SET_CURRENT_ROUTE: {
      return { ...state, currentRoute: action.currentRoute };
    }
    case SET_SERVER_MESSAGE: {
      return { ...state, serverMessage: action.serverMessage };
    }
    case SET_SEARCH_VALUE: {
      return { ...state, searchValue: action.searchValue };
    }
    case SET_LANGUAGE: {
      return { ...state, currentLanguage: action.currentLanguage };
    }
    default:
      return state;
  }
};

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING,
  isFetching,
});
export const setDirection = (direction) => ({
  type: SET_DIRECTION,
  direction,
});
export const setCurrentRoute = (currentRoute) => ({
  type: SET_CURRENT_ROUTE,
  currentRoute,
});
export const setServerMessage = (serverMessage) => ({
  type: SET_SERVER_MESSAGE,
  serverMessage,
});
export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  searchValue,
});
export const setCurrentLanguage = (currentLanguage) => ({
  type: SET_LANGUAGE,
  currentLanguage,
});

export default commonReducer;
