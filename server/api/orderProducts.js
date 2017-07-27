const router = require('express').Router();
const {Order, OrderProduct, Product} = require('../db/models');
module.exports = router;

// Back query for order details --> address name
// In the case for both users but more importantly guests

// view a list of all orders (admin access only)
// get all details of a specific order
