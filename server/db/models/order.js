const Sequelize = require('sequelize')
const db = require('../db')

//foreign id: userId
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'shipped', 'cancelled', 'delivered'],
    defaultValue: 'created'
  },
  nameShipping: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nameBilling: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingAddress : {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ccNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dateProcessed: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dateShipped: {
    type: Sequelize.DATE,
  },
  dateDelivered: {
    type: Sequelize.DATE,
  },
});


module.exports = Order;

// ccExpiration: {
//     type: Sequelize.INTEGER,
//   },
//   ccSecurity: {
//     type: Sequelize.INTEGER,
//   },
// total: {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//   },
