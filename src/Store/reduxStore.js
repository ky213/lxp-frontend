import { reducer as formReducer } from 'redux-form';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './Reducers/user';
import commonReducer from './Reducers/common';
import coursesReducer from './Reducers/courses';
import activitiesReducer from './Reducers/activities';
import notificationsReducer from './Reducers/notifications';
import programsReducer from './Reducers/programs';

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
