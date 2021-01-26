export const GLOBAL_ACTION_TYPES = {
  SET_LOADING: 'global/SET_LOADING',
  SET_SUCCESS: 'global/SET_SUCCESS',
  SET_ERROR: 'global/SET_ERROR',
  RESET: 'global/RESET',
};

const initialState = {
  loading: false,
  success: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GLOBAL_ACTION_TYPES.SET_LOADING:
      return { ...state, loading: true, success: false, error: null };
    case GLOBAL_ACTION_TYPES.SET_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case GLOBAL_ACTION_TYPES.SET_ERROR:
      return { ...state, loading: false, success: null, error: payload };
    case GLOBAL_ACTION_TYPES.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const resetGlobalState = () => ({
  type: GLOBAL_ACTION_TYPES.RESET,
});