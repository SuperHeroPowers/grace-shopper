const router = require('express').Router();
const {User, Order} = require('../db/models');
module.exports = router;

//get metadata for all orders from a specific user, not including products
//specific orders should go in OrderProduct route
router.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(orders => res.json(orders))
  .catch(next);
});

