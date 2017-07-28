import React from 'react';

export default function Order (props) {

	const order = props.order;
	return (
	        <li className="media">
			      <div className="media-body">
			        <h4 className="media-heading">{ orders.status }</h4>
			        <h4 className="media-heading">{ orders.firstNameShipping }</h4>
			        <h4 className="media-heading">{ orders.lastNameShipping }</h4>
			        <h4 className="media-heading">{ orders.firstNameBilling }</h4>
			        <h4 className="media-heading">{ orders.lastNameBilling }</h4>
			        <h4 className="media-heading">{ orders.shippingAddress }</h4>
			        <h4 className="media-heading">{ orders.billingAddress }</h4>
			        <h4 className="media-heading">{ orders.dateProcessed }</h4>
			        <h4 className="media-heading">{ orders.dateShipped }</h4>
			        <h4 className="media-heading">{ orders.dateDelivered }</h4>
			        <h4 className="media-heading">{ orders.totalPrice }</h4>
			      </div>
	    		</li>
	        );
			}
