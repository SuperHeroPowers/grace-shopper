const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('review', {
    rating: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    reviews: {
        type: Sequelize.TEXT
    }
})

module.exports = Reviews;