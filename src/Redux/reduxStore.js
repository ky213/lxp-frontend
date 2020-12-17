import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import userReducer from './userReducer';
import commonReducer from './commonReducer';


let reducers = combineReducers({
    user: userReducer,
    common: commonReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi));

window.store = store;

export default store;