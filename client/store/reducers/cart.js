import axios from 'axios';
import history from '../../history';

// Initial State, cart of the currently logged in user or guest
const cart=[];

// Action Types
const GET_CART = 'GET_CART';

// Action creators
const getCart = cart => ({type: GET_CART, cart});

// Thunk creators
export const addToCart = (product, user) =>
  dispatch =>
    axios.put(`/api/cart/${user.id}`, {productId: product.id})
      .then(res => {console.log('put request response', res); dispatch(getCart(res.data))})
      .catch(err => console.log(err))

export const deleteFromCart = (product, user) =>
  dispatch =>
    axios.delete(`/api/cart/${user.id}`, {productId: product.id})
      .then(res => dispatch(getCart(res.data)))
      .catch(err => console.log(err))

// Reducer
export default function (state = cart, action) {
  switch (action.type) {
   case GET_CART:
  	 return action.cart;
   default:
     return state;
  }
}
