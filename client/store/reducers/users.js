//reducer for admin managing all users
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_USER = 'CREATE_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const users = []
/**
 * ACTION CREATORS
 */
const createUser = user => ({type: CREATE_USER, user})
const deleteUser = user => ({type: DELETE_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const postUser = user =>
  dispatch =>
    axios.post('/api/users', user)
      .then(res =>
        dispatch(createUser(res.data)))
      .catch(err => console.log(err));

export const deleteUserPermanant = id =>
  dispatch =>
    axios.delete('/api/users/${id}')
      .then(res =>
        dispatch(deleteUser(res.data)))
      .catch(err => console.log(err));

export const putUser = (id, user) =>
  dispatch =>
    axios.put('/api/users/${id}', user)
      .then(res =>
        dispatch(updateUser(res.data)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = users, action) {
  switch (action.type) {
    case CREATE_USER:
      return [...state, action.user]
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id);
    case UPDATE_USER:
      return state.map(user => (
        action.user.id === user.id ? action.user : user
      ));
    default:
      return state
  }
}
