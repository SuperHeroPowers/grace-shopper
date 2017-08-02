const Sequelize = require('sequelize')
const db = require('../db');
const {OrderProduct} = ('../db/models');

//foreign id: userId
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'shipped', 'cancelled', 'delivered'],
    defaultValue: 'created'
  },
  sessionId: {
    type: Sequelize.STRING
  },
  firstNameShipping: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastNameShipping: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstNameBilling: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastNameBilling: {
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

  dateProcessed: {
    type: Sequelize.DATE,
  },
  dateShipped: {
    type: Sequelize.DATE,
  },
  dateDelivered: {
    type: Sequelize.DATE,
  },
}, {
  instanceMethods: {
    totalPrice: function() {
      return OrderProduct.findAll({
        where: {
          orderId: this.id
        }
      })
      .then(products => {
        var total = 0;
        products.forEach(function(product){
          console.log()
          total += product.totalProductPrice;
        });
        console.log("total",total);
        return total;
      });
    }
  },
  hooks: {
    afterCreate: function(order) {
      if (!order.userId){
        console.log('IS THIS GOING TO LOG???', process.env.SESSION_SECRET);
        localStorage.setItem("sessionId", process.env.SESSION_SECRET);
        order.sessionId = localStorage.getItem("sessionId");
      }
    }
  }
});

module.exports = Order;