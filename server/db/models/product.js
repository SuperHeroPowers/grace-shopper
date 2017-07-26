const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	category: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	}
});

module.exports = Product;