const router = require('express').Router();
const {User, OrderDetail, Product} = require('../db/models');
module.exports = router;

//get all orders
router.get('/:userId', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!

  })
    .then()
    .catch(next)
})
