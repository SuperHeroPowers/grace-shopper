const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/orders', () => {
    beforeEach(() => {
        return Order.create({
          firstNameShipping: 'Monica',
          lastNameShipping: 'Choe',
          firstNameBilling: 'Monica',
          lastNameBilling : 'Choe',
          shippingAddress: 'asdf',
          billingAddress: 'sdgf',
          ccNumber: 1234
        })
    })

    it('GET /api/orders', () => {
      return request(app)
      .get('/api/orders')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].firstNameBilling).to.be.equal('Monica');
      })
    });

    it ('POST /', ()=>{
      return request(app)
      .post('/api/orders')
      .send({
          firstNameShipping: 'Danni',
          lastNameShipping: 'Liu',
          firstNameBilling: 'Kelaiya',
          lastNameBilling : 'Parikh',
          shippingAddress: 'asdf',
          billingAddress: 'sdgf',
          ccNumber: 98876
        })
      .expect(201)
      .then(res=>{
        expect(res.body).to.be.an('object')
        expect(res.body.firstNameBilling).to.be.equal('Kelaiya')
      })
    });
  });

});