import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class OrderCart extends Component{
    constructor(){
        super();
        this.state={
            order:[],
            orderProducts:[]
        };
    }
    componentDidMount(){
        var orderId = this.props.match.params.orderId;
        console.log('PROPS',this.props);
        axios.get('/api/orders/5')
        .then(res => res.data)
        .then(order => {this.setState({ order })});

    }
    render(){
        const order=this.state.order;
        const test=order[0];
        console.log('ORDER',order,order[0]);
        return (
            <div>
                <h1>CART</h1>
                <h2>Order ID #200</h2>
                <ul>
                    <li>Placed by Bob Smith</li>
                    <li>Shipping Name</li>
                    <li>Shipping Address</li>
                    <li>Billing Name</li>
                    <li>Billing Address</li>
                    <li>Status</li>
                    <li>Date Processed</li>
                    <li>Date Shipped</li>
                    <li>Date Delivered</li>
                </ul>
                <form action="">
                    <div class="row">
                        <div class="col-md-4">Item Name</div>
                        <div class="col-md-4">Quantity Field</div>
                        <div class="col-md-4">Price</div>
                    </div>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                    </ul>
                    <div class="row">
                        <div class="col-md-4">Item 1</div>
                        <div class="col-md-4"><input type="text" name="quantity" value="1" /></div>
                        <div class="col-md-4">$3.00</div>
                    </div>
                    {/*<div class="row">*/}
                        {/*<div class="col-md-4">Item Name</div>*/}
                        {/*<div class="col-md-4">3</div>*/}
                        {/*<div class="col-md-4">$3.00</div>*/}
                    {/*</div>*/}
                </form>
            </div>
        )
    }
};