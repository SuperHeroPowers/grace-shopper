const router = require('express').Router();
const {Order, OrderProduct, Product, User} = require('../db/models');
module.exports = router;

// view a list of all orders (admin access only)
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Product,
      through: { 
        attributes: ['orderId']}
      }]
  })
  .then(orders => res.json(orders))
  .catch(next);
});

//get all details of a specific order
router.get('/:orderId', (req, res, next) => {
  const orderIdNum = req.params.orderId;
  Order.findAll({
    where:{
      id : orderIdNum
    },
    include: [{
      model: Product,
      through: { 
        attributes: ['orderId']}
      }]
      
  })
  .then(orderDetails =>{
    console.log("hey")
    res.json(orderDetails)
  }
  )
  .catch(next);
});

router.get('/:orderId/users', (req, res, next) => {
  const orderIdNum = req.params.orderId;
  Order.findAll({
    where:{
      id : orderIdNum
    },
    include: [{model: User }]
      
  })
  .then(orderUser =>
    res.json(orderUser)
  )
  .catch(next);
});

router.post('/', (req, res, next)=>{
  Order.create(req.body)
  .then(order=> res.status(201).json(order))
  .catch(next);
})

//change the status of order (admin only)
const authorized = (userId) => {
  return User.findOne({
    where: {
      id: userId
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user => user && user.isAdmin)
}

router.put('/:orderId', (req, res, next) => {
  const userId = req.session.userId;
  authorized(userId)
  .then(authorized => {
    authorized ?
    Order.findById(req.params.orderId)
    .then(order => {
      order.update({
        status: req.body
      });
    })
    .catch(next)
    :
    res.sendStatus(401)
  })
});
