import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './reducers/user'
import products from './reducers/products'
import users from './reducers/users'
import orders from './reducers/order';
import carts from './reducers/cart';

const reducer = combineReducers({user, users, products, orders, carts});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware);

export default store;
export * from './reducers/user';
export * from './reducers/products';
export * from './reducers/users';
export * from './reducers/order';
export * from './reducers/cart';