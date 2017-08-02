const router = require('express').Router()
const {User, Order, OrderProduct, Product, Review} = require('../db/models')
module.exports = router;

const getACart = (user) => {
  var cart;
  if (!user) {
    if (!req.localStorage.guestCart)
      req.localStorage.setItem('guestCart', [])
    cart = req.localStorage.getItem('guestCart');
  }
  else {
    cart = user.cart;
  }
  return cart;
}

const addToCart = (cart, productId) => {
  console.log('in add to cart function')
  for (var i = 0; i < cart.length; i++){
    if (cart[i].id === productId){
      cart[i].quantity++;
      break;
    }
  }
  cart.push({
    id: productId,
    quantity: 1
  })
  return cart;
}

const deleteFromCart = function (cart, productId) {
  for (var i = 0; i < cart.length; i++){
    if (cart[i].id === productId){
      cart.splice(i, 1)
      break;
    }
  }
  return cart;
}

router.get('/', (req, res, next) => {
  const userId = req.session.userId;
  userId ?
  User.findById(userId)
    .then(user => res.json(user.cart))
  :
  res.json(getACart(null))
})
//'cart/:userId'
router.put('/:userId', (req, res, next) => {
  console.log('userId', req.params.userId)
  req.params.userId ?
  User.findById(Number(req.params.userId))
    .then (realUser => addToCart(getACart(realUser), req.body.productId))
    .then (cart => res.json(cart))
    .catch(next)
  :
  res.json(addToCart(getACart(null), req.body.productId))
})

router.delete('/:userId', (req, res, next) => {
  req.params.userId ?
  User.findById(req.params.userId)
    .then(realUser => deleteFromCart(getACart(realUser), req.body.productId))
    .then (cart => res.json(cart))
    .catch(next)
  :
  res.json(deleteFromCart(getACart(null), req.body))
});
