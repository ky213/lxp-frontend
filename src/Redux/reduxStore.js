import { reducer as formReducer } from 'redux-form';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './userReducer';
import commonReducer from './commonReducer';
import coursesReducer from './coursesReducer';
import activitiesReducer from './activitiesReducer';
import notificationsReducer from './notificationsReducer';
import programsReducer from './programsReducer';

let reducers = combineReducers({
  user: userReducer,
  common: commonReducer,
  courses: coursesReducer,
  activities: activitiesReducer,
  notifications: notificationsReducer,
  programs: programsReducer,
  form: formReducer,
});

let store = createStore(
  reducers,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunkMiddleWare, multi))
    : compose(applyMiddleware(thunkMiddleWare, multi))
);

export default store;
