import React, {Component} from 'react';
import { connect } from 'react-redux';

/** COMPONENT **/
const Cart = (props) => {
	console.log('hello', props.user);
	console.log('asdfasdf', props.cart);
  {user, cart} = props;
	return (
		<div>
      
		</div>
	)
};

/** CONTAINER **/
const mapState = (state, ownProps) => {
  return {
    user : state.user,
    cart: state.orders.filter(order => order.userId === state.user.id && order.status === 'created')[0]
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