'use strict';

const db = require('./server/db');

const Category=db.models.category;
const Order=db.models.order;
const OrderProduct=require('./server/db/models/orderProduct');
const Product=db.models.product;
const Review=db.models.review;
const User=db.models.user;
const Bluebird = require('bluebird');

const defaultCategories=[
    {name: 'Physical', productId: 4},
    {name: 'Physical', productId: 5},
    {name: 'Physical', productId: 6},
    {name: 'Physical', productId: 7},
    {name: 'Mental', productId: 2},
    {name: 'Manipulation', productId: 1},
    {name: 'Transportation', productId: 3}
];

const defaultUsers=[
    {firstName: 'Danni', lastName:'Liu', email:'danniliu@gmail.com', password:'1234', isAdmin:true},
    {firstName: 'Monica', lastName:'Choe', email:'monica@gmail.com', password:'1234', isAdmin:true},
    {firstName: 'Kelaiya', lastName:'Parikh', email:'kelaiya@email.com', password:'1234', isAdmin:false},
    {firstName: 'Alice', lastName:'Chuang', email:'alice@gmail.com', password:'1234', isAdmin:false},
    {firstName: 'Bob', lastName:'Smith', email:'bob@email.com', password:'1234', isAdmin:false},
    {firstName: 'Tim', lastName:'Smith', email:'tim@email.com', password:'1234', isAdmin:false},
    {firstName: 'Sally', lastName:'Smith', email:'sally@email.com', password:'1234', isAdmin:false},
    {firstName: 'John', lastName:'Smith', email:'john@email.com', password:'1234', isAdmin:false},
    {firstName: 'Ted', lastName:'Smith', email:'ted@email.com', password:'1234', isAdmin:false},
    {firstName: 'Billy', lastName:'Smith', email:'billy@email.com', password:'1234', isAdmin:false},
    {firstName: 'Jane', lastName:'Smith', email:'jane@email.com', password:'1234', isAdmin:false}
];


const defaultReview=[
    {rating:5,description:'',userId:1,productId:1},
    {rating:1,description:'blob',userId:2,productId:3},
    {rating:5,description:'blob',userId:3,productId:2},
    {rating:2,description:'blob',userId:4,productId:4}
];

const defaultOrders=[
    {status:'created',firstNameShipping:'Bob',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:1},
    {status:'created',firstNameShipping:'Sam',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:2},
    {status:'processing',firstNameShipping:'Sam',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:3},
    {status:'created',firstNameShipping:'Sam',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:4},
    {status:'processing',firstNameShipping:'Sam',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:5},
    {status:'created',firstNameShipping:'Sally',lastNameShipping:'Smith',firstNameBilling:'Bob',lastNameBilling:'Smith',shippingAddress:'123 Main St, New York, NY, 10016',billingAddress:'123 Main St, New York, NY, 10016',userId:6},
    {
        status:'created',
        firstNameShipping:'Danni',
        lastNameShipping:'Liu',
        firstNameBilling:'Danni',
        lastNameBilling:'Liu',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
        userId:2
    },
    {
        status:'processing',
        firstNameShipping:'Monica',
        lastNameShipping:'Choe',
        firstNameBilling:'Monica',
        lastNameBilling:'Choe',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
        userId:1
    },
        {
        status:'processing',
        firstNameShipping:'Monica NO USER',
        lastNameShipping:'Choe',
        firstNameBilling:'Monica',
        lastNameBilling:'Choe',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
    },
    {
        status:'shipped',
        firstNameShipping:'Kelaiya',
        lastNameShipping:'Parikh',
        firstNameBilling:'Kelaiya',
        lastNameBilling:'Parikh',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
        userId:3
    },
    {
        status:'delivered',
        firstNameShipping:'Alice',
        lastNameShipping:'Chuang',
        firstNameBilling:'Alice',
        lastNameBilling:'Chuang',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
        userId:5
    },
    {
        status:'cancelled',
        firstNameShipping:'Danni',
        lastNameShipping:'Liu',
        firstNameBilling:'Danni',
        lastNameBilling:'Liu',
        shippingAddress:'123 Main St, New York, NY, 10016',
        billingAddress:'123 Main St, New York, NY, 10016',
        userId:2
    }
];

const defaultOrderProducts=[
    {orderId:1,productId:1,quantity:1,price:100},
    {orderId:2,productId:2,quantity:1,price:500},
    {orderId:3,productId:3,quantity:2,price:1000},
    {orderId:4,productId:4,quantity:1,price:200},
    {orderId:5,productId:5,quantity:1,price:100},
    {orderId:5,productId:6,quantity:1,price:100}
];


const defaultProducts=[
    {
        name: 'Animagus',
        price: 100,
        imagePath: 'https://qph.ec.quoracdn.net/main-qimg-4f75d1921b93dfbc2db33130a3b32248.webp',
        description: 'transform into any animal you want, even a unicorn!',
        categoryId: 3
    },
    {
        name: 'Telepath',
        price: 500,
        imagePath: 'http://vignette1.wikia.nocookie.net/babylon5/images/6/62/Psi_Corps_training.JPG/revision/latest?cb=20061004084650',
        description: 'read that people\'s mind without their consent',
        categoryId: 2
    },
    {
        name: 'Time Travel',
        price: 1000,
        imagePath: 'http://globalcomment.com/wp-content/uploads/2016/08/5768498207_c1a154da07_b.jpg',
        description: 'traveling back in time so you can fix all your mistakes',
        categoryId: 4
    },
    {
        name: 'Fly',
        price: 200,
        imagePath: 'https://images.pottermore.com/bxd3o8b291gf/6OqVmtWM484yQKyOS2kCo0/46164b635747242f025cd926c43da212/RonWeasley_PM_B3C13M1_RonFlyingFireboltAtQuidditchPitchWithHarryWatching_Moment.jpg?w=2560&h=1120&fit=thumb&f=top&q=85',
        description: 'so that you can play Quiddich',
        categoryId: 1
    },
    {name: 'Super Speed',price: 100,imagePath: 'https://i.ytimg.com/vi/hZbjSJsO1C8/maxresdefault.jpg', description: 'race to the finishing line',categoryId:1},
    {name: 'Super Hearing',price: 100,imagePath:'https://lh3.googleusercontent.com/EhBrVuxTt8F0jKteBJ7uMQFTs-0yaXeSztViZxBIOmhGNJe56nYJPIgGuE3UCI-R_8w=h900',description: 'evesdropping in on people has never been so easy!',categoryId:1},
    {name: 'X-Ray Vision',price: 100,imagePath: 'https://timenerdworld.files.wordpress.com/2012/04/x-ray-glasses.jpg?w=360&h=240&crop=1', description: 'nothing on earth can hide form your prying eyes',categoryId:1},
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
        return Bluebird.map(defaultProducts, item => {
            return Product.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultOrders, item => {
            return Order.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultOrderProducts, item => {
            return OrderProduct.create(item);
        })
    })
    .then(() => {
        return Bluebird.map(defaultReview, item => {
            return Review.create(item);
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

