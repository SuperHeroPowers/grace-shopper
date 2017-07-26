const Sequelize = require('sequelize')
const db = require('../db');

const OrderProduct = db.define('orderProduct',{
	quantity: {
		type: Sequelize.INTEGER,
		where:{
			$ne: 0
		}
	},
	priceCurrent: Sequelize.INTEGER,
	totalPrice: Sequelize.INTEGER
});
module.exports = OrderProduct;