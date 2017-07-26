const Sequelize = require('sequelize')
const db = require('../db');

const OrderProduct = db.define('orderProduct',{
	quantity: {
		type: Sequelize.INTEGER,
		where:{
			$ne: 0
		}
	},
	//here price is the price when the order was placed.
	price: Sequelize.INTEGER,
	totalPrice: Sequelize.INTEGER
}
// ,{
// 	classMethods : {
// 		totalPrice(orderId){
// 			where: {
// 				orderId: orderId
// 			}
// 			return this.quantity * this.price;
// 		}
// 	}
});
module.exports = OrderProduct;