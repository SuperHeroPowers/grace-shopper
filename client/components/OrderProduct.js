import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store from '../store';
console.log("hhh");
function OrderProduct (props) {
	const {orders, path} = props;
	console.log('props', props)
	console.log("props.path", props.path)
	console.log("orders",props.orders);
	const order = orders.filter(function(orderPro){return (Number(orderPro.id) === Number(props.path.orderId))})[0]
	console.log("order",order);
	return (<div>
	        	<ul>
	        				<h3><li>To First Name :{order.firstNameShipping}</li></h3>
	       		      <h3><li>To Last Name :{ order.lastNameShipping }</li></h3>
	       		      <li>From First Name :{ order.firstNameBilling }</li>
	       		      <li>From Last Name :{ order.lastNameBilling }</li>
	       		      <li>Shipping Address :{ order.shippingAddress }</li>
	     	          <li>Billing Address :{ order.billingAddress }</li>
	     		        <li>{ order.dateProcessed }</li>
	     		        <li>{ order.dateShipped }</li>
	    		        <li>{ order.dateDelivered }</li>
      		        <li>Total Price :{ order.totalPrice }</li>
      		  </ul>
	        </div>
	        );
			}

	const mapStateToProps = function(state, ownProps){
		console.log("state",ownProps.match.params)
		return {
			orders: state.orders,
			path: ownProps.match.params
		};
	};

	export default withRouter(connect(mapStateToProps)(OrderProduct));
