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
	const order = orders.filter(function(orderPro){return (orderPro.status !== 'created')&& (Number(orderPro.id) === Number(props.path.orderId))})[0]
	console.log("order",order.products);

	return (<div>
							{
      		      order.products.map(product =>
      		        <div>
      		        <ul id={product.id}>
      		        <h1> Order Details </h1>
      		        <li><img src={product.imagePath} width="200"/></li>
      		        	<li><h3>To First Name :{order.firstNameShipping}</h3></li>
		       		      <li><h3>To Last Name :{ order.lastNameShipping }</h3></li>
		       		      <li><h3>From First Name :{ order.firstNameBilling }</h3></li>
		       		      <li><h3>From Last Name :{ order.lastNameBilling }</h3></li>
		       		      <li><h3>Shipping Address :{ order.shippingAddress }</h3></li>
		     	          <li><h3>Billing Address :{ order.billingAddress }</h3></li>
		     		        <li><h3>Total Price :{ order.totalPrice }</h3></li>
      		        	
	      		        <li><h3>Product Name : {product.name}</h3></li>
	      		        <li><h3>Product Description : {product.description}</h3></li>
	      		        <li><h3>Product Price : {product.price}</h3></li>
	      		       </ul>
      		        </div>
      		        )
      		     }
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
