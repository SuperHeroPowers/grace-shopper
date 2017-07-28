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
	imagePath:{
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	inventory: {
		type: Sequelize.INTEGER
	}
},{
	getterMethods: {
		floatPrice: function() { return this.price / 100.0} 
	}

});

module.exports = Product;