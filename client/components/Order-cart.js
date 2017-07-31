import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class OrderCart extends Component{
    constructor(){
        super();
        this.state={
            order:{},
            user:{},
            orderProducts:[]
        };
    }
    componentDidMount(){
        var orderId = this.props.match.params.orderId;
        // console.log('PROPS',this.props);
        axios.get('/api/orders/5')
        .then(res => res.data)
        .then(order => {
            console.log('ORDER',order[0],order[0].user);
            this.setState({order:order[0],user:order[0].user})
        });

    }
    render(){
        const order=this.state.order;
        const user=this.state.user;
        const orderDetail={};
        console.log('ORDER COMPONENT',user.firstName);
        return (
            <div>
                <h1>CART</h1>
                <h2>Order ID {order.id}</h2>
                <ul>
                    <li>Placed by {user.firstName} {user.lastName} {user.email}</li>
                    <li>Shipping Address {order.firstNameShipping} {order.lastNameShipping}</li>
                    <li>Billing Name {order.firstNameBilling} {order.lastNameBilling}</li>
                    <li>Billing Address {order.shippingAddress}</li>
                    <li>Date Processed {order.dateProcessed}</li>
                    <li>Date Shipped {order.dateShipped}</li>
                    <li>Date Delivered {order.dateDelivered}</li>
                    <li>Status {order.status}</li>
                </ul>
                <form action="">
                    <div className="row">
                        <div className="col-md-4">Item Name</div>
                        <div className="col-md-4">Quantity Field</div>
                        <div className="col-md-4">Price</div>
                    </div>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                    </ul>
                    <div className="row">
                        <div className="col-md-4">Item 1</div>
                        <div className="col-md-4"><input type="text" name="quantity" value="1" /></div>
                        <div className="col-md-4">$3.00</div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Item Name</div>
                        <div className="col-md-4">3</div>
                        <div className="col-md-4">$3.00</div>
                    </div>
                </form>
            </div>
        )
    }
};