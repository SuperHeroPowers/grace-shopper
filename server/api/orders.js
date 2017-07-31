const router = require('express').Router();
const {Order, OrderProduct, Product,User} = require('../db/models');
module.exports = router;

// view a list of all orders (admin access only)
router.get('/', (req, res, next) => {
  Order.findAll({})
  .then(orders => res.json(orders))
  .catch(next);
});

//get Order+User
router.get('/:orderId', (req, res, next) => {
  const orderIdNum = req.params.orderId;
    // OrderProduct.findAll({
    //   where:{
    //     orderId : orderIdNum
    //   },
    //   include: [{model: Order, include: [ User ]}, Product]
    // })

  Order.findAll({
      where:{
        id:orderIdNum
      },
      include:[User]
  })
  .then(orderDetails =>
    res.json(orderDetails)
  )
  .catch(next);
});

router.get('/:orderId/orderProducts', (req, res, next) => {
    const orderIdNum = req.params.orderId;
    OrderProduct.findAll({
      where:{
        orderId : orderIdNum
      },
      include: [Product]
    })
    .then(orderDetails =>
        res.json(orderDetails)
    )
    .catch(next);


    // Order.findAll({
    //     where:{
    //         id : orderIdNum
    //     },
    //     include: [{
    //         model: Product,
    //         through: {
    //             attributes: ['orderId']}
    //     }]
    //
    // })
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

router.post('/', (req, res, next)=>{
  Order.create(req.body)
  .then(order=> res.status(201).json(order))
  .catch(next);
})
