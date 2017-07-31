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
Product.belongsToMany(Category, {through: 'ProductCategory', foreignKey: 'productId'});
Category.belongsToMany(Product, {through: 'ProductCategory', foreignKey: 'categoryId'});
// Product.hasMany(Category); //created a key in Product table we didn't want?

// Product.belongsToMany(Order, {through: OrderProduct, foreignKey: 'productId'});
// Order.belongsToMany(Product, {through: OrderProduct, foreignKey: 'orderId'});

// do not remove replaced the above
OrderProduct.belongsTo(Product);
OrderProduct.belongsTo(Order);
// do not remove

module.exports = {
  User,
  OrderProduct,
  Order,
  Product,
  Category,
  Review
};

