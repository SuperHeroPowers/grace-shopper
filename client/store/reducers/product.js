import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

/**
 * INITIAL STATE
 */
const products = [];

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});
const getProduct = product => ({type: GET_PRODUCT, product});
const createProduct = product => ({type: CREATE_PRODUCT, product});
const removeProduct = product => ({type: REMOVE_PRODUCT, product});
const updateProduct = product => ({type: UPDATE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/products')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.log(err));

export const fetchSingleProduct = () =>
  dispatch =>
    axios.get('/products/:productId')
      .then(res =>
        dispatch(getProduct(res.data)))
      .catch(err => console.log(err));

export const postProduct = () =>
  dispatch =>
    axios.post('/products')
      .then(res =>
        dispatch(createProduct(res.data)))
      .catch(err => console.log(err));

export const deleteProduct = () =>
  dispatch =>
    axios.delete('/products/:productId')
      .then(res =>
        dispatch(removeProduct(res.data)))
      .catch(err => console.log(err));

export const putProduct = () =>
  dispatch =>
    axios.put('/products/:productId')
      .then(res =>
        dispatch(updateProduct(res.data)))
      .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function (state = products, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return [...state, action.product];
    case GET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    case UPDATE_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
