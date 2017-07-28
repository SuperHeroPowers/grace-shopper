import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

export default function OrderList (props) {
	const {orders} = props;

	return(
	       <ul>
	       {
	       	orders.map(order => {
	       		return (
	       		        <li key={order.id}>
	       		        	<NavLink to={`/orders/${order.id}`}>
	       		        		<span> {order.firstNameShipping} </span>
	       		        	</NavLink>
	       		        </li>
	       		        )
	       					})
	       	}
	       </ul>
				);
	
	}
	const mapStateToProps = function(state){
		return {
			orders: state.orders
		};
	};

	export default withRouter(connect(mapStateToProps)(OrderList));