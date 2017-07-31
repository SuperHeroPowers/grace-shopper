const User = require('./user');
const Review = require('./review');
const Product = require('./product');
const Category = require('./category');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);
Product.belongsToMany(Order, {through: OrderProduct, foreignKey: 'productId'});
Order.belongsToMany(Product, {through: OrderProduct, foreignKey: 'orderId'});

// SH: Needed for getter and setter methods the association makes
Product.belongsToMany(Category, {through: 'ProductCategory', foreignKey: 'productId'});

// SH: May not be necessary
Category.belongsToMany(Product, {through: 'ProductCategory', foreignKey: 'categoryId'});

// OrderProduct.belongsTo(Product);
// OrderProduct.belongsTo(Order);

module.exports = {
  User,
  OrderProduct,
  Order,
  Product,
  Category,
  Review
};
