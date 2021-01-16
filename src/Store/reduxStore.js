import { reducer as formReducer } from 'redux-form';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authentication, user, common, courses, activities, notifications, programs } from './Reducers';

let reducers = combineReducers({
  authentication,
  user,
  common,
  courses,
  activities,
  notifications,
  programs,
  form: formReducer,
});

let store = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunkMiddleWare, promiseMiddleware, multi))
    : compose(applyMiddleware(thunkMiddleWare, promiseMiddleware, multi))
);

export default store;
