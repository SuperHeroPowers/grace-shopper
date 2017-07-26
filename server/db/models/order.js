const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['cart', 'pending', 'completed'],
    defaultValue: 'cart'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shipping : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billing: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  datePlaced: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateShipped: {
    type: Sequelize.STRING,
  }
});

module.exports = Order;
