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
          total += product.totalProductPrice;
        });
        return total;
      });
    }
  },
  hooks: {
    beforeCreate: {
      function(order) {
        if (!order.userId){
          localStorage.setItem("sessionId", process.env.SESSION_SECRET);
          order.sessionId = localStorage.getItem("sessionId");
        }
      }
    }
  }
});

module.exports = Order;

//before creating the order(which is a cart), check if it comes with userId, if not it's a guest, set sessionId on the model
