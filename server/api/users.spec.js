const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/users', () => {
    beforeEach(() => {
        return User.create({
          firstName: 'Monica',
          lastName: 'Choe',
          email: 'monica@gmail.com',
          password: 'abcdef'
        })
    })

    it('GET /api/users', () => {
      return request(app)
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        console.log('hello result?', res.body[0]);
        expect(res.body[0].email).to.be.equal('monica@gmail.com');
      })
    });

    it('GET /api/users/1', ()=>{
      return request(app)
      .get('/api/users/1')
      .then(res=> {
        expect(res.body).to.be.an('object');
        expect(res.body.lastName).to.be.equal('Choe');
      })
    });

    it ('POST /', ()=>{
      return request(app)
      .post('/api/users')
      .send({
          firstName: 'Danni',
          lastName: 'Liu',
          email: 'danni@gmail.com',
          password: 'abcdef'
        })
      .expect(201)
      .then(res=>{
        expect(res.body).to.be.an('object')
        expect(res.body.firstName).to.be.equal('Danni')
      })
    });
  });

});