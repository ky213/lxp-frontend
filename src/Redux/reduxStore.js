import {reducer as formReducer} from 'redux-form';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import userReducer from './userReducer';
import commonReducer from './commonReducer';
import coursesReducer from './coursesReducer';
import activitiesReducer from './activitiesReducer';



let reducers = combineReducers({
    user: userReducer,
    common: commonReducer,
    courses: coursesReducer,
    activities: activitiesReducer,
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi));

window.store = store;

export default store;