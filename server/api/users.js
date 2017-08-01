const router = require('express').Router()
const {User, Order, OrderProduct, Product, Review} = require('../db/models')
module.exports = router

//admin only
const authorizedAdmin = (userId) => {
  return User.findOne({
    where: {
      id: userId
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user => user && user.isAdmin)
}

router.get('/', (req, res, next) => {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    //user that someone want to update
    const userId = req.session.userId; //current person wanting to update said user
    authorizedAdmin(userId)
    .then(authorized => {
    authorized ?
      User.findAll({
        attributes: ['id', 'email']
      })
    .then(users => res.json(users))
    .catch(next)
    :
    res.sendStatus(401)
  })
})

//returns a specific user by userid
router.get('/:userId', (req, res, next) => {
  const userIdNum = req.params.userId;
  return User.findOne({
    where: {
      id: userIdNum
    },
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
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
  if(!Number(userIdNum)){res.sendStatus(500);}
  else{
    Review.findAll({
      where: {
        userId: userIdNum
      },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
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


// Admin or user
// Update user info and delete user
const authorizedAdminOrUser = (userId, currentUserId) => {
  return User.findOne({
    where: {
      id: currentUserId
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user => user && (userId === currentUserId || user.isAdmin))
}

router.put('/:userId', (req, res, next)=>{
  const userId = req.params.userId; //user that someone want to update
  const currentUserId = req.session.userId; //current person wanting to update said user
  authorizedAdminOrUser(userId, currentUserId)
  .then(authorized => {
    authorized ?
      User.update(req.body, {where: {id : userId}, returning: true})
      .then(user => res.status(200).json(user))
      .catch(next)
    :
    res.sendStatus(401)
  })
});

router.delete('/:userId', (req, res, next)=>{
  const userId = req.params.userId; //user that someone want to update
  const currentUserId = req.session.userId; //current person wanting to update said user
  authorizedAdminOrUser(userId, currentUserId)
  .then(authorized => {
  authorized ?
    User.destroy({
      where: {
        id: userId
      }
    })
    .then(()=> res.sendStatus(204))
    .catch(next)
    :
    res.sendStatus(401)
  })
})
