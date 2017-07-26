const Sequelize = require('sequelize')
const db = require('../db');

const OrderProduct = db.define('orderProduct',{
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			min: 1
		}
	},
	//here price is the price when the order was placed.
	price: Sequelize.FLOAT
},{
	getterMethods:{
		totalProductPrice: function(){
			return this.quantity * this.price;
		}
	}
}

});
module.exports = OrderProduct;