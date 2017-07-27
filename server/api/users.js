const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')
module.exports = router

//admin only
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//returns a specific user by userid
router.get('/:userId', (req, res, next) => {
  const userIdNum = req.params.userId;
  return User.findById(userIdNum)
  .then(user => res.json(user))
  .catch(next);
});

//get all orders placed by a specific user
router.get('/:userId/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(orders => res.json(orders))
  .catch(next);
});
