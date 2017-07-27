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
      return Product.create({
        name: prodName,
        price: prodPrice
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(prodName);
          expect(res.body[0].price).to.be.equal(prodPrice);
        })
    });

    it('GET /api/products/1', ()=>{
      return request(app)
      .get('/api/products/1')
      .then(res=> {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.equal(prodName);
      })
    });

    it ('POST /', ()=>{
      return request(app)
      .post('/api/products')
      .send({name: 'cat', price:50})
      .expect(201)
      .then(res=>{
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.be.equal('cat')
        expect(res.body.price).to.be.equal(50)
      })
    })

    it ('does not POST invalid', ()=>{
      return request(app)
      .post('/api/products')
      .send({name: 'Monica'})
      .expect(500);
    });

    before(() => {
      return Product.create({
        name: 'Monica',
        price: 9999
      })
    })

    it('DELETE /api/products/2', ()=>{
      return request(app)
      .delete('/api/products/2')
      .expect(204)
      .then(res=> {});
    });

    it ('product id 2 no longer exists', ()=>{
      return request(app)
      .get('/api/products')
      .then(res=>{
        expect(res.body.length).to.equal(1)
      })
    })




  }) // end describe('/api/users')

}) // end describe('User routes')
