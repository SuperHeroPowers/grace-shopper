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

  //Forpossible future use
  // ccNumber: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  // ccExpiration: {
  //   type: Sequelize.INTEGER,
  // },
  // ccSecurity: {
  //   type: Sequelize.INTEGER,
  // },

  
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
  }
});

module.exports = Order;