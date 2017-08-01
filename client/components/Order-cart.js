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

        // axios.all([
        //     axios.get(`/api/orders/5`),
        //     axios.get(`api/orders/5/orderProducts`)
        // ])
        // .then(axios.spread((order, orderProducts) => {
        //     order=order.data[0];
        //     const user=order.user;
        //     orderProducts=orderProducts.data;
        //     console.log("ALL",order,user);
        //     console.log('OP',orderProducts);
        //     this.setState({ order, user  });
        // }));

        axios.get('/api/orders/5')
        .then(res => res.data)
        .then(order => {
            // console.log('ORDER',order[0],order[0].user);
            this.setState({order:order[0],user:order[0].user})
        });

        axios.get('api/orders/5/orderProducts')
        .then(res => res.data)
        .then(orderProducts => {
            console.log('prods',orderProducts);
            this.setState({ orderProducts});
        });
    }

    render(){
        const order=this.state.order;
        const user=this.state.user;
        const orderProducts=this.state.orderProducts;
        console.log('ORDER COMPONENT',user.firstName,orderProducts);
        return (
            <div className="container">
                <h1>CART</h1>


                <form action="">

                </form>




            <div className="col-md-9">
                <div className="page-header">
                    <h1>Order #{order.id}: <Link to=""><button type="button" className="btn btn-lg btn-primary">Edit</button></Link></h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
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
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-header">
                            <h2>All Items in Order</h2>
                        </div>

                        <table className="table table-striped">
                            <thead>
                            <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orderProducts.map(item => {
                                return (
                                <tr key={item.id}>
                                <td>{ item.id }</td>
                                <td><Link
                                to={`/item/view/${item.id}`}>{ `${item.product.name}`}</Link>
                                </td>
                                <td><Link to={`/campuses/view/${item.id}`}>{ item.product.name }</Link>
                                </td>
                                <td>{ item.email }</td>
                                <td>{`@${item.firstName}`}</td>
                                <td className="text-right"><button type="button" onClick={this.handleClick} id={item.id} className="btn btn-xs btn-danger">delete</button></td>
                                </tr>
                                );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            </div>
        )
    }
};