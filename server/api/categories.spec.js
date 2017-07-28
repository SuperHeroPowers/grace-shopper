const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  });

  describe('/api/categories/', () => {

    const name1 = 'purple';

    beforeEach(() => {
        return Category.create({
          name: name1
        })
    })

    it('GET /api/categories', () => {
      return request(app)
      .get('/api/categories')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.be.equal('purple');
      })
    });

    it('GET /api/categories/1', ()=>{
      return request(app)
      .get('/api/categories/1')
      .then(res=> {
        expect(res.body).to.be.an('array');
      })
    });

    it ('POST /', ()=>{
      return request(app)
      .post('/api/categories')
      .send({name: 'blue'})
      .expect(201)
      .then(res=>{
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.be.equal('blue')
      })
    });
  });

});
