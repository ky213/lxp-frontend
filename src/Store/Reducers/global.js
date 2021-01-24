export const GLOBAL_ACTION_TYPES = {
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
    case GLOBAL_ACTION_TYPES.SET_SUCCESS:
      return { ...state, loading: false, success: true };
    case GLOBAL_ACTION_TYPES.SET_ERROR:
      return { ...state, loading: false, error: payload };
    case GLOBAL_ACTION_TYPES.RESET:
      return { ...initialState };
    default:
      return state;
  }
};
