const Sequelize = require('sequelize');
const db = require('../db');
//category should be required??
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
	imagePath:{
		type: Sequelize.STRING,
        defaultValue: 'https://unsplash.it/g/252/200/?random'

	},
	inventory: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
},{
	getterMethods: {
		floatPrice: function() { return this.price / 100.0}
	}
});

module.exports = Product;
