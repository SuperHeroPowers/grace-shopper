const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
// const User = require('./user');
// const Product = require('./product');

const Reviews = db.define('reviews', {
    rating: {
        type:Sequelize.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
},
{
    getterMethods:{
        rating:function(rate){
            //convert ratings to strings for ENUM
            return this.getDataValue('rating')+'';
        }
    },
    setterMethods: {
        rating: function(rate) {
            //convert ratings to strings for ENUM
            this.setDataValue('rating', rate+'');
        }
    }
    // ,
    // defaultScope: {
    //     include: [Product,User]
    // }
}
)

module.exports = Reviews