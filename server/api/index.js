const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
<<<<<<< HEAD
router.use('/users', require('./users'))
router.use('/reviews', require('./reviews'))
=======
>>>>>>> 7fb88c12a9014d3bb97b4fde0170dfdb91a41def
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
