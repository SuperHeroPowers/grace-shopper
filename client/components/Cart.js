import React, {Component} from 'react';
import { connect } from 'react-redux';

/** COMPONENT **/
const Cart = (props) => {
	console.log('hello', props.user);
	console.log('cart', props.cart);
  const {user, cart, products, onClickEvent} = props;
	return (
		<div>
      <h2>{cart[0]}</h2>
      <button >Check Out</button>
		</div>
	)
};


/** CONTAINER **/
const mapState = (state, ownProps) => {
  return {
    user : state.user,
    cart: state.user.cart,
    products:state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(placeOrder(user))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart);
