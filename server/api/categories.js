const router = require('express').Router()
const {Category} = require('../db/models')

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next);
});

router.get('/:categoryId/products', (req, res, next)=>{

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