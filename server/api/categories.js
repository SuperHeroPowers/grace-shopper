const router = require('express').Router()
const {Category} = require('../db/models')

router.get('/', (req, res, next) => {
	Category.findAll()
	.then(categories => res.json(categories))
	.catch(next);
});

// Returns all products of a specified category
router.get('/:categoryId', (req, res, next)=>{
	Category.findById(req.params.categoryId)
	.then(category => {
		return category.getProducts()
	})
	.then(products => res.json(products))
	.catch(next);
});

router.post('/', (req, res, next)=>{
	Category.create(req.body)
	.then(category => res.status(201).json(category))
	.catch(next);
});

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