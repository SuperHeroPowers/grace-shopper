const Sequelize = require('sequelize')
const db = require('../db');
const Order = require('./order');
const Product = require('./product');

const OrderProduct = db.define('orderProduct',{
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			min: 1
		}
	},
	//here price is the price when the order was placed.
	price: Sequelize.INTEGER
},{
	hooks: {
    beforeValidate: () => {
    	Order.findById(this.orderId)
    	.then(function(order){
    		if (order.status === "created")
    		{
    			Product.findById(this.productId)
    			.then(function(product){
    				this.price = product.price;
    			})
    		}
    	})
      
    }
  },
	getterMethods:{
		totalProductPrice: function(){
			return this.quantity * this.price;
		}
	}

});
module.exports = OrderProduct;