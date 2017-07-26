const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
    rating: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    desc: {
        type: Sequelize.TEXT
    }
})

module.exports = Reviews