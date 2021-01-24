import isPromise from 'is-promise';

import { GLOBAL_ACTION_TYPES } from 'Store/Reducers/global';

export default store => next => action => {
  const { success, error } = store.getState().global;
  const actionName = action.type.split('/').pop();

  if (!isPromise(action.payload) || !['CREATE', 'UPDATE', 'DELETE'].includes(actionName)) {
    return next(action);
  }

  if (success || error)
    store.dispatch({
      type: GLOBAL_ACTION_TYPES.RESET,
    });

  return next(action)
    .then(response => {
      const actionType = response.action.type;

      if (actionType.endsWith('FULFILLED'))
        store.dispatch({
          type: GLOBAL_ACTION_TYPES.SET_SUCCESS,
        });

      return Promise.resolve(response);
    })
    .catch(error => {
      store.dispatch({
        type: GLOBAL_ACTION_TYPES.SET_ERROR,
        payload: error.response.data.message,
      });

      return Promise.reject(error);
    });
};
