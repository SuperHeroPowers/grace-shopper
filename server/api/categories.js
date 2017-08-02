const router = require('express').Router()
const {Category, Product} = require('../db/models')
const db = require('../db');

// GET all categories
router.get('/', (req, res, next) => {
	Category.findAll()
	.then(categories => res.json(categories))
	.catch(next);
});

// GET all products of specific category
// returns array
router.get('/:categoryId', (req, res, next)=>{
	const ans = req.params.categoryId;
	Category.findById(req.params.categoryId)
	.then(category => category.getProducts())
	.then(products => {
		res.json(products)
	})
	.catch(next);
});

// Admin use
// POST new category
router.post('/', (req, res, next)=>{
	Category.create(req.body)
	.then(category => res.status(201).json(category))
	.catch(next);
});

// Admin use
// DELETE category
router.delete('/:categoryId', (req, res, next)=> {
	Category.destory({
		where : {
			id : req.params.categoryId
		}
	})
	.then(()=>res.sendStatus(204))
	.catch(next);
});

module.exports = router;