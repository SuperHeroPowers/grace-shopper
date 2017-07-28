import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './reducers/user'
import product from './reducers/product'
import users from './reducers/users'

const reducer = combineReducers({user, users, product});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './product';
export * from './users';
