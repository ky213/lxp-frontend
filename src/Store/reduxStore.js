import { reducer as formReducer } from 'redux-form';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

import { NotificationMiddleware } from 'Components';
import { global, authentication, common, courses, activities, notifications, programs, users } from './Reducers';

const reducers = combineReducers({
  global,
  authentication,
  common,
  courses,
  activities,
  programs,
  users,
  notifications,
  form: formReducer,
});

const store = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunkMiddleWare, NotificationMiddleware, promiseMiddleware, multi))
    : compose(applyMiddleware(thunkMiddleWare, promiseMiddleware, multi))
);

export default store;
