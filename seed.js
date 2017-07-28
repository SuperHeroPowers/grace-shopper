'use strict';

const db = require('./server/db');
const models=require('./server/db/models');
const Category=db.models.category;
const Order=db.models.order;
const OrderProduct=db.models.orderProduct;
const Product=db.models.product;
const Reviews=db.models.reviews;
const User=db.models.user;
const Bluebird = require('bluebird');

const defaultCategories=[
    {title: 'Animal'},
    {title: 'Plant'},
    {title: 'Earth'},
    {title: 'Water'},
    {title: 'Human'}
];

const defaultUsers=[
    {firstName: 'Bob', lastName:'Smith', email:'bob@email.com', password:'1234', isAdmin:false},
    {firstName: 'Tim', lastName:'Smith', email:'tim@email.com', password:'1234', isAdmin:false},
    {firstName: 'Sally', lastName:'Smith', email:'sally@email.com', password:'1234', isAdmin:false},
    {firstName: 'Jane', lastName:'Smith', email:'jane@email.com', password:'1234', isAdmin:false}
];

const defaultReviews=[
    {rating:3,description:'blob'},
    {rating:1,description:'blob'},
    {rating:5,description:'blob'},
    {rating:2,description:'blob'},
    {rating:2,description:'blob'},
    {rating:2,description:'blob'},
    {rating:2,description:'blob'}
];

const defaultOrders=[
    {status:'created',firstNameShipping:'Bob',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016'},
    {status:'created',firstNameShipping:'Sam',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016'},
    {status:'created',firstNameShipping:'Sally',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016'},
    {status:'created',firstNameShipping:'Jane',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016'},
    {status:'created',firstNameShipping:'Moose',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016'}
];



const defaultProducts=[
    {name: 'Super Speed',price: 100,description: 'description'},
    {name: 'Super Hearing',price: 100,description: 'description'},
    {name: 'Super Seeing',price: 100,description: 'description'},
    {name: 'Super Super',price: 100,description: 'description'}
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


// function seedDB() {
//     console.log('Syncing database');
//
//     // dunno how to manage promises here...
//     // needed quick and dirty seed
//     defaultDummy.map(dummy => {
//         // console.log(category);
//         Dummy.create(dummy)
//             .then(function (data) {
//                 console.log("DATA",data);
//                 console.log("++++++++++++++++++++++");
//                 return data;
//             });
//
//     });
//     // defaultStudents.map(student => {
//     //     Students.create(student)
//     //         .then(function (data) {
//     //             console.log("DATA",data);
//     //             console.log("++++++++++++++++++++++");
//     //
//     //         });
//     // });
// }
//
// seedDB();
