import isPromise from 'is-promise';

import { GLOBAL_ACTION_TYPES } from 'Store/Reducers/global';

export default store => next => action => {
  const { success, error } = store.getState().global;
  const actionName = action.type.split('/').pop();

  if (!isPromise(action.payload)) {
    return next(action);
  }

  store.dispatch({
    type: GLOBAL_ACTION_TYPES.RESET,
  });

  return next(action)
    .then(response => {
      const actionType = response.action.type;

      if (actionType.endsWith('FULFILLED') && ['CREATE', 'UPDATE', 'DELETE'].includes(actionName))
        store.dispatch({
          type: GLOBAL_ACTION_TYPES.SET_SUCCESS,
        });

      return Promise.resolve(response);
    })
    .catch(err => {
      store.dispatch({
        type: GLOBAL_ACTION_TYPES.SET_ERROR,
        payload: err.response.data.message,
      });

      return Promise.reject(err);
    });
};
