const router = require('express').Router();
const {Product} = require('../db/models');

router.get('/', (req, res, next)=>{
	Product.findAll()
	.then(products => res.json(products))
	.catch(next);
});

router.get('/:productId', (req, res, next)=>{
	Product.findById(req.params.productId)
	.then(product => res.json(product))
	.catch(next);
});

// product.category returns a sequelize array
router.get('/:productId/categories', (req, res, next)=>{
	Product.findById(req.params.productId)
	.then(product => res.send(product.category));
});

router.post('/', (req, res, next)=>{
	Product.create(req.body)
	.then(product => res.status(201).json(product))
	.catch(next);
});

router.put('/:productId', (req, res, next)=>{
	Product.update(req.body, {where: {id : campusId}, returning: true})
	.then(product => res.status(200).json(product))
	.catch(next);
});

router.delete('/:productId', (req, res, next)=> {
	Product.destory({
		where : {
			id : req.params.productId
		}
	})
	.then(()=>res.sendStatus(204))
	.catch(next);
});

module.exports = router;