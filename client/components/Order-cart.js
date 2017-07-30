import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class OrderCart extends Component{
    constructor(){
        super();
        this.state={
            order:[]
        };
    }
    componentDidMount(){
        axios.get('/api/orders/5')
            .then(res => res.data)
            .then(order => {this.setState({ order })});

    }
    render(){
        const order=this.state.order;
        const test=order[0];
        console.log('ORDER',order[0]);
        return (
            <div>
                <h1>CART</h1>
                <ul>
                    <li>Order ID #200 {order.orderId} placed by Bob Smith</li>
                    <li>Shipping Name</li>
                    <li>Shipping Address</li>
                    <li>Billing Name</li>
                    <li>Billing Address</li>
                    <li>Status</li>
                    <li>Date Processed</li>
                    <li>Date Shipped</li>
                    <li>Date Delivered</li>
                </ul>

            </div>
        )
    }
};