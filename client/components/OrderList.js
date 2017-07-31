import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'; 
import store from '../store';
function OrderList (props) {
	const {orders, users, currentUser} = props;
	const authorized = currentUser.isAdmin;
	return(
	  <div>
		{	
			authorized ? 
	      <ul>
	       {
	    		orders.map( order => {
						return(
	       		  	<li key={order.id}>
									<li><h2>{order.firstNameShipping}</h2></li>
	       		      <li>{ order.lastNameShipping }</li>
	       		      <li>{ order.firstNameBilling }</li>
	       		      <li>{ order.lastNameBilling }</li>
	       		      <li>{ order.shippingAddress }</li>
	     	          <li>{ order.billingAddress }</li>
	     		        <li>{ order.dateProcessed }</li>
	     		        <li>{ order.dateShipped }</li>
	    		        <li>{ order.dateDelivered }</li>
      		        <li>{ order.totalPrice }</li>
      					</li>
	       			)
	    			})
	       	}
	     	</ul> : 
			    (<div className="Container">
						<h2>You don't have access</h2>;
					</div>)
			}
		</div>
)}

	const mapStateToProps = function(state, ownProps){
		console.log("props",state.orders, state.user)
		return {
			orders: state.orders,
			users: state.users,
			currentUser: state.user
		};
	};

	export default withRouter(connect(mapStateToProps)(OrderList));