import isPromise from 'is-promise';

import { GLOBAL_ACTION_TYPES } from 'Store/Reducers/global';

export default store => next => action => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  return next(action)
    .then(response => {
      const { config, status } = response.value;
      if (['post', 'put', 'delete'].includes(config.method) && [200, 201].includes(status)) {
        store.dispatch({
          type: GLOBAL_ACTION_TYPES.SET_SUCCESS,
        });

        store.dispatch({
          type: GLOBAL_ACTION_TYPES.RESET,
        });
      }

      return Promise.resolve(response);
    })
    .catch(err => {
      store.dispatch({
        type: GLOBAL_ACTION_TYPES.SET_ERROR,
        payload: err.response?.data.message,
      });

      store.dispatch({
        type: GLOBAL_ACTION_TYPES.RESET,
      });

      return Promise.reject(err);
    });
};
