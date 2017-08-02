import React, {Component} from 'react';
import { connect } from 'react-redux';

/** COMPONENT **/
const Cart = (props) => {
  const {user, carts} = props;
  const cart = carts.filter(order => order.userId === props.user.id && order.status === 'created')[0]
	console.log(props);
  console.log('hello', cart);
  console.log('price??', cart.totalPrice);
  return (
		<div>
      {cart.products.map(product => {
        console.log(product)
        return (<div><img src={product.imagePath} /><h6>{product.name}</h6></div>)})}
		</div>
	)
};

/** CONTAINER **/
const mapState = (state, ownProps) => {
  return {
    user : state.user,
    carts : state.carts
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart);