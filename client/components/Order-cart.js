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

    }
    render(){
        return (
            <div>
                <h1>CART</h1>
            </div>
        )
    }
};