const User = require('./user');
const Reviews = require('./reviews');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

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
