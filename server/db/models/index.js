const User = require('./user');
const Reviews = require('./reviews');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Reviews);
Reviews.belongsTo(User);
Product.hasMany(Reviews);
Reviews.belongsTo(Product);
Product.belongsToMany(Order, {through: OrderProduct, foreignKey: 'productId'});
Order.belongsToMany(Product, {through: OrderProduct, foreignKey: 'orderId'});
Product.belongsToMany(Category, {through: 'ProductCategory', foreignKey: 'productId'});
Category.belongsToMany(Product, {through: 'ProductCategory', foreignKey: 'categoryId'});

module.exports = {
  User,
  OrderProduct,
  Order,
  Product,
  Category,
  Reviews
}
