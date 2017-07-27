const router = require('express').Router();
const {Product} = require('../db/models');

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
// POST new product
router.post('/', (req, res, next)=>{
	Product.create(req.body)
	.then(product => res.status(201).json(product))
	.catch(next);
});

// Admin use
// PUT specific product
router.put('/:productId', (req, res, next)=>{
	Product.update(req.body, {where: {id : req.params.productId}, returning: true})
	.then(product => res.status(200).json(product))
	.catch(next);
});

// Admin use
// DELETE specific product
router.delete('/:productId', (req, res, next)=> {
	Product.destroy({
		where : {
			id : req.params.productId
		}
	})
	.then(()=>res.sendStatus(204))
	.catch(next);
});
module.exports = router;