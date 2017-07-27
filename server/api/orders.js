const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

// view a list of all orders (admin access only)
router.get('/', (req, res, next) => {
  Order.findAll({})
  .then(orders => res.json(orders))
  .catch(next);
});

//get order history of a specific user
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(orders => res.json(orders))
  .catch(next);
});

//change the status of order (admin only)
router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(order => {
    order.update({
      status: req.body
    });
  })
  .catch(next)
});
