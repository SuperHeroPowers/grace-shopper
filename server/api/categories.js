const router = require('express').Router()
const {Category} = require('../db/models')

// GET all categories
router.get('/', (req, res, next) => {
	Category.findAll()
	.then(categories => res.json(categories))
	.catch(next);
});

// GET all products of specific category
// returns array
router.get('/:categoryId', (req, res, next)=>{
	Category.findById(req.params.categoryId)
	.then(category => {
		return category.getProducts()
	})
	.then(products => res.json(products))
	.catch(next);
});

// Admin use
// POST new category
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
	  Category.create(req.body)
			.then(category => res.status(201).json(category))
			.catch(next)
	  :
    res.redirect('https://http.cat/[401]')
  })
});

// Admin use
// DELETE category
router.delete('/:categoryId', (req, res, next)=> {
	const userId = req.session.userId;
	authorized(userId)
	.then(authorized => {
	  authorized ?
		Category.destory({
			where : {
				id : req.params.categoryId
			}
		})
		.then(()=>res.sendStatus(204))
		.catch(next)
		:
		res.sendStatus(401)
	})
});

module.exports = router;
