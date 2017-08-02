const Sequelize = require('sequelize')
const db = require('../db');
const {OrderProduct} = ('../db/models');

//foreign id: userId
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'shipped', 'cancelled', 'delivered'],
    defaultValue: 'processing'
  },
  sessionId: {
    type: Sequelize.STRING
  },
  firstNameShipping: {
    type: Sequelize.STRING,
  },
  lastNameShipping: {
    type: Sequelize.STRING,
  },
  firstNameBilling: {
    type: Sequelize.STRING,
  },
  lastNameBilling: {
    type: Sequelize.STRING,
  },
  shippingAddress : {
    type: Sequelize.STRING,
  },
  billingAddress: {
    type: Sequelize.STRING,
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
//   hooks: {
//     afterCreate: {
//       function(order) {
//         if (!order.userId){
//           localStorage.setItem("sessionId", process.env.SESSION_SECRET);
//           order.sessionId = localStorage.getItem("sessionId");
//         }
//       }
//     }
//   }
});

module.exports = Order;

//before creating the order(which is a cart), check if it comes with userId, if not it's a guest, set sessionId on the model
