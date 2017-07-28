'use strict';
const db = require('./server/db');
const models=require('./server/db/models');
const Category=db.models.category;
const Order=db.models.order;
const OrderProduct=db.models.orderProduct;
const Product=db.models.product;
//const Review=db.models.review;
const User=db.models.user;
const Bluebird = require('bluebird');

const defaultCategories=[
    {title: 'Physical'},
    {title: 'Mental'},
    {title: 'Manipulation'},
    {title: 'Transportation'}
];

const defaultUsers=[
    {firstName: 'Danni', lastName:'Liu', email:'danniliu@gmail.com', password:'1234', isAdmin:true},
    {firstName: 'Monica', lastName:'Choe', email:'monica@gmail.com', password:'1234', isAdmin:true},
    {firstName: 'Kelaiya', lastName:'Parikh', email:'kelaiya@email.com', password:'1234', isAdmin:false},
    {firstName: 'Alice', lastName:'Chuang', email:'alice@gmail.com', password:'1234', isAdmin:false}
];

// const defaultReviews=[
//     {rating:3,description:'blob'},
//     {rating:1,description:'blob'},
//     {rating:5,description:'blob'},
//     {rating:2,description:'blob'},
//     {rating:2,description:'blob'},
//     {rating:2,description:'blob'},
//     {rating:2,description:'blob'}
// ];

const defaultOrders=[
  {
    status:'created',
    firstNameShipping:'Danni',
    lastNameShipping:'Liu',
    firstNameBilling:'Danni',
    lastNameBilling:'Liu',
    shippingAddress:'123 Main St, New York, NY, 10016',
    billingAddress:'123 Main St, New York, NY, 10016'
  },
  {
    status:'processing',
    firstNameShipping:'Monica',
    lastNameShipping:'Choe',
    firstNameBilling:'Monica',
    lastNameBilling:'Choe',
    shippingAddress:'123 Main St, New York, NY, 10016',
    billingAddress:'123 Main St, New York, NY, 10016'
  },
  {
    status:'shipped',
    firstNameShipping:'Kelaiya',
    lastNameShipping:'Parikh',
    firstNameBilling:'Kelaiya',
    lastNameBilling:'Parikh',
    shippingAddress:'123 Main St, New York, NY, 10016',
    billingAddress:'123 Main St, New York, NY, 10016'
  },
  {
    status:'delivered',
    firstNameShipping:'Alice',
    lastNameShipping:'Chuang',
    firstNameBilling:'Alice',
    lastNameBilling:'Chuang',
    shippingAddress:'123 Main St, New York, NY, 10016',
    billingAddress:'123 Main St, New York, NY, 10016'
  },
  {
    status:'cancelled',
    firstNameShipping:'Danni',
    lastNameShipping:'Liu',
    firstNameBilling:'Danni',
    lastNameBilling:'Liu',
    shippingAddress:'123 Main St, New York, NY, 10016',
    billingAddress:'123 Main St, New York, NY, 10016'
  },
];

const defaultProducts =[
  {
    name: 'Animagus',
    price: 100,
    imagePath: 'https://qph.ec.quoracdn.net/main-qimg-4f75d1921b93dfbc2db33130a3b32248.webp',
    description: 'transform into any animal you want, even a unicorn!',
    category: ['Physical']
  },
  {
    name: 'Telepath',
    price: 500,
    imagePath: 'http://vignette1.wikia.nocookie.net/babylon5/images/6/62/Psi_Corps_training.JPG/revision/latest?cb=20061004084650',
    description: 'read that people\'s mind without their consent',
    category: ['Mental']
  },
  {
    name: 'Time Travel',
    price: 1000,
    imagePath: 'http://globalcomment.com/wp-content/uploads/2016/08/5768498207_c1a154da07_b.jpg',
    description: 'traveling back in time so you can fix all your mistakes',
    category: ['Manipulation']
  },
  {
    name: 'Fly',
    price: 200,
    imagePath: 'https://images.pottermore.com/bxd3o8b291gf/6OqVmtWM484yQKyOS2kCo0/46164b635747242f025cd926c43da212/RonWeasley_PM_B3C13M1_RonFlyingFireboltAtQuidditchPitchWithHarryWatching_Moment.jpg?w=2560&h=1120&fit=thumb&f=top&q=85',
    description: 'so that you can play Quiddich',
    category: ['Transportation']
  }
];

db.sync({force: true})
    .then(() => {
        return Bluebird.map(defaultCategories, item => {
            return Category.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultUsers, item => {
            return User.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultOrders, item => {
            return Order.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultProducts, item => {
            return Product.create(item);
        })
    })
    .then(() => {
        console.log('hey it seeded!');
    })
    .catch(err => {
        console.log('err seeding', err);
    })
    .finally(() => {
        db.close();
        console.log('connection closed!')
    });

