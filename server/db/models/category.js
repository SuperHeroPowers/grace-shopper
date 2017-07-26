const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category',{
	title: {
		title: Sequelize.STRING
	}
});

module.exports = Category;