import axios from 'axios';
import history from '../../history';

// Initial State
// Storing all carts found in the database
const carts=[];

// Action Types
const GET_CART = 'GET_CART';
const GET_CARTS = 'GET_CARTS';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// const CREATE_CART = 'CREATE_CART';

// Action creators
const getCart = cart => ({type: GET_CART, cart});
const getCarts = carts => ({type: GET_CARTS, carts});
const addToCart = product => ({type: ADD_TO_CART, product});
const removeFromCart = product => ({type: REMOVE_FROM_CART, product});
// const createCart =  => 

// Thunk creators
export const fetchCarts = () =>
  	dispatch =>
    	axios.get('/api/orders')
        .then(res => res.data.filter(order=> order.status === 'created'))
      	.then(res => {console.log("data",res);
              dispatch(getCarts(res || carts))})
      	.catch(err => console.log(err));


// export const addToCart = (product, user) =>
//     dispatch =>
//       axios.get('/api/orders')
//       .then(res => res.data.filter(order => order.status === 'created' && order.userId === user.id))
//       .then(res => {
//         if (res.length === 0){
//           dispatch(postCart({
//             userId: user.id, 
//             productId: product.Id
//           }))
//         } else{
//           dispatch(putCart({
//             orderId: res.[0].id
//           }))
//         })


export const postCart = (order) => 
	dispatch =>
		axios.post('/api/orders', order )
		.then(res => dispatch(createOrder(res.data || orders)))
		.catch(err => console.log(err));

// export const putOrder = order =>
// 	dispatch =>
// 		axios.put(`/api/orders/${order.id}`, order)
// 		.then(res => dispatch(updateOrder(res.data || orders)))
// 		.catch(err => console.log(err));

// Reducer
export default function (state = carts, action) {
  switch (action.type) {
   case GET_CARTS:
      	return action.carts;
   case GET_CART:
  	return state.filter(order=> order.id === action.cart.id);
   case ADD_TO_CART:
    	return [...state.filter(order => order.id !== action.order.id), action.order];
   case REMOVE_FROM_CART:
   	return [...state, action.order];
    default:
      return state;
  }
}
