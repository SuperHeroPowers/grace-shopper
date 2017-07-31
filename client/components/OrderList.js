import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store from '../store';
function OrderList (props) {
	const {orders, user} = props;

	return(
	       <ul>
	       {
	    		orders.map( order => {
	    			return(
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
	const mapStateToProps = function(state, ownProps){
		console.log("props",state.orders, state.user)
		return {
			orders: state.orders,
			user: state.user
		};
	};

	export default withRouter(connect(mapStateToProps)(OrderList));