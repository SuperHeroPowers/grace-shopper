const router = require('express').Router();
const {Product, User} = require('../db/models');


// GET all products
router.get('/', (req, res, next)=>{
	Product.findAll()
	.then(products => res.json(products))
	.catch(next);
});

// GET specific product
router.get('/:productId', (req, res, next)=>{
	Product.findById(req.params.productId)
	.then(product => res.json(product))
	.catch(next);
});

// GET specific product's reviews
router.get('/:productId/reviews', (req, res,next)=>{
	Product.findById(req.params.productId)
	.then(product => product.getReviews())
	.then(reviews => res.json(reviews));
});

// Admin use
const authorized = (userId) => {
	return User.findOne({
    where: {
      id: userId
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user => user && user.isAdmin)
}

router.post('/', (req, res, next)=>{
	const userId = req.session.userId;
	authorized(userId)
	.then(authorized => {
	  authorized ?
	  Product.create(req.body)
  	  .then(product => res.status(201).json(product))
  	  .catch(next)
	  :
    res.redirect('https://http.cat/[401]')
  })
});

router.put('/:productId', (req, res, next)=>{
	const userId = req.session.userId;
	authorized(userId, next)
	.then(authorized => {
	  authorized ?
	  	Product.update(req.body, {where: {id : req.params.productId}, returning: true})
    	.then(product => res.status(200).json(product))
    	.catch(next)
	  :
    res.sendStatus(401)
  })
});

router.delete('/:productId', (req, res, next)=>{
	const userId = req.session.userId;
	authorized(userId, next)
	.then(authorized => {
	  authorized ?
	  Product.destroy({
      where : {
        id : req.params.productId
      }
    })
    .then(()=>res.sendStatus(204))
    .catch(next)
	  :
    res.sendStatus(401)
  })
});

module.exports = router;
