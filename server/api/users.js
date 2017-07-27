const router = require('express').Router()
const {User, Order, OrderProduct, Product, Review} = require('../db/models')
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

//get all reviews by a user
router.get('/:userId/reviews', (req, res, next) => {
  const userIdNum = req.params.userId;
  if(!Number(userId)){res.sendStatus(500);}
  else{
    Reviews.findAll({
      where: {
        userId: userIdNum
      },
      include: {
        model: User
      }
    })
    .then(function (userReviews) {
      if(userReviews){res.json(userReviews)}
      else{
        res.sendStatus(404);
      }
    })
    .catch(next);
  }
});

//add a review from user
router.post('/:userId/review', (req, res, next) => {
  return Review.create (req.body)
  .then(newReview => {
    res.sendStatus(201).json(newReview)
  })
  .catch(next);
});


// Admin Use
// POST new user
router.post('/', (req, res, next)=>{
  return User.create(req.body)
  .then(user => res.status(201).json(user));
});

// Admin Use
// DELETE user
router.delete('/:userId', (req, res, next)=>{
  return User.destroy({
    where: {
      id: res.params.userId
    }
  })
  .then(()=> res.sendStatus(204))
  .catch(next);
})