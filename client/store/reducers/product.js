import axios from 'axios'
import history from '../../history'

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
const removeProduct = id => ({type: REMOVE_PRODUCT, id});
const updateProduct = product => ({type: UPDATE_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.log(err));

export const fetchSingleProduct = (id) =>
  dispatch =>
    axios.get('/api/products/${id}')
      .then(res =>
        dispatch(getProduct(res.data)))
      .catch(err => console.log(err));

export const postProduct = product =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res =>
        dispatch(createProduct(res.data)))
      .catch(err => console.log(err));

export const putProduct = (id, product) =>
  dispatch =>
    axios.put('/api/products/${id}', product)
      .then(res =>
        dispatch(updateProduct(res.data)))
      .catch(err => console.log(err));

export const deleteProduct = (id) =>
  dispatch =>
    dispatch(removeProduct(id));
    axios.delete('/api/products/${id}')
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
      return state.map(product => (
        action.product.id === product.id ? action.product : product
      ));
    default:
      return state;
  }
}
