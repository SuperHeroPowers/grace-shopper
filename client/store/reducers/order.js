import axios from 'axios';
import history from '../history';

// Initial State
const orders = [];

// Action Types
const GET_ORDER = 'GET_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

// Action creators
const getOrder = order => ({type: GET_ORDER, order});
const getOrders = orders => ({type: GET_ORDERS, orders});
const createOrder = order => ({type: CREATE_ORDER, order});
const updateOrder = order => ({type: UPDATE_ORDER, order});

// Thunk creators
export const fetchOrders = () =>
  	dispatch =>
    	axios.get('/api/orders')
      	.then(res => dispatch(getOrders(res.data || orders)))
      	.catch(err => console.log(err));

export const fetchOrder = order =>
  	dispatch =>
    	axios.get(`/api/orders/${order.id}`)
      	.then(res => dispatch(getOrder(res.data || orders)))
      	.catch(err => console.log(err));

export const postOrder = order => 
	dispatch =>
		axios.post('/api/orders', order)
		.then(res => dispatch(createOrder(res.data || orders)))
		.catch(err => console.log(err));

export const putOrder = order =>
	dispatch =>
		axios.put(`/api/orders/${order.id}`, order)
		.then(res => dispatch(updateOrder(res.data || orders)))
		.catch(err => console.log(err));

// Reducer
export default function (state = orders, action) {
  switch (action.type) {
    case GET_ORDER:
      	return [...state, action.order];
  	case GET_ORDERS:
  		return action.orders;
    case UPDATE_ORDER:
    	return [...state.filter(order => order.id !== action.order.id), action.order];
   	case CREATE_ORDER:
   		return [...state, action.order];
    default:
      return state;
  };
};
