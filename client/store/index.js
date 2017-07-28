import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './reducers/user';
import product from './reducers/product';
import users from './reducers/users';
import order from './reducers/order';

const reducer = combineReducers({user, users, product, order});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
export * from './reducers/product';
export * from './reducers/users';
export * from './reducers/order';