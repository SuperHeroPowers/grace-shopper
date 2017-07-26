const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

// Back query for order details --> address name
// In the case for bothusers but more importantly guests
router.get('/:orderId', (req, res, next)=>{
	const orderId = req.params.orderId
	OrderProduct.findAll({where:{
		id : orderId
	}})
	.then(function(order){
		include: [{ model: Order.findById(orderId)}]
	})
	.then(function(detail){
		res.send(detail);
	})
});