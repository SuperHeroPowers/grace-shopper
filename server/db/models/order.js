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
  dateProcessed: {
    type: Sequelize.DATE,
  },
  dateShipped: {
    type: Sequelize.DATE,
  },
  dateDelivered: {
    type: Sequelize.DATE,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
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
// {
//   instanceMethods: {
//     getTotal: function(){
//       return Order.findAll({
//         include: [{
//           model: OrderProduct,
//           where: {
//             id: this.id
//           }
//         }
//         ]
//       })
//     }
//   }
