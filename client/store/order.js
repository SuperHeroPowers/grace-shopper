import axios from 'axios';
import socket from '../socket';

// ACTION TYPES
const GET_ORDER = 'GET_ORDER';
const GET_ORDERS = 'GET_ORDERS';

// ACTION CREATORS
export function getOrder (order) {
  const action = { type: GET_ORDER, order };
  return action;
}

export function getOrders (orders) {
  const action = { type: GET_ORDERS, orders };
  return action;
}

// THUNK CREATORS
export function fetchOrders () {

  return function thunk (dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders);
        dispatch(action);
      });
  };
}

export function fetchOrder () {

  return function thunk (dispatch) {
    return axios.get(`/api/orders/${order.id}`)
      .then(res => res.data)
      .then(order => {
        const action = getOrder(order);
        dispatch(action);
      });
  };
}

export function postChannel (order) {

  return function thunk (dispatch) {
    return axios.post('/api/orders', order)
      .then(res => res.data)
      .then(neworder => {
        dispatch(getChannel(newOrder));
        socket.emit('new-order', newOrder);
        history.push(`/orders/${newOrder.id}`);
      });
  };
}

// REDUCER
export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_ORDERS:
      return action.orders;

    case GET_ORDER:
      return [...state, action.order];

    default:
      return state;
  }

}