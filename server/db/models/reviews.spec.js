const {expect} = require('chai');
const db = require('../db');
const Reviews = db.model('reviews');

describe('Reviews model', () => {

    beforeEach(() => {
        return db.sync({force: true})
    });

    describe('instanceMethods', () => {

        describe('correctPassword', () => {

            let review1;

            beforeEach(() => {
                return Reviews.create({
                    ratings: 3,
                    description: 'Review blob'
                })
                    .then(review => {
                        review1 = review
                    })
            })

            it('returns true if the password is correct', () => {
                expect(review1.correctPassword('bones')).to.be.equal(true)
            })

            it('returns false if the password is incorrect', () => {
                expect(review1.correctPassword('bonez')).to.be.equal(false)
            })

        }) // end describe('correctPassword')

    }) // end describe('instanceMethods')

}) // end describe('Reviews model')
