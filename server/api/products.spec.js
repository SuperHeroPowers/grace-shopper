const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/products/', () => {

    const prodName = 'power1';
    const prodPrice = 100;

    beforeEach(() => {
      return Prouct.create({
        name: prodName,
        price: prodPrice
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(prodName)
        })
    })

  }) // end describe('/api/users')

}) // end describe('User routes')
