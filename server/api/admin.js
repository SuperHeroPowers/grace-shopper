const router = require('express').Router();
const {Product, User} = require('../db/models');
module.exports = router;
//routes for admin only

// Admin use
// PUT specific product
router.put('/:userId/products/:productId', (req, res, next)=>{
  const userIdNum = req.params.userId;
  return User.findOne({
    where: {
      id: userIdNum
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user =>{
    if (user.isAdmin){
      Product.update(req.body, {where: {id : req.params.productId}, returning: true})
      .then(product => res.status(200).json(product))
      } else {
        res.sendStatus(401)
      }
    })
  .catch(next);
});

// Admin use
// DELETE specific product
router.put('/:userId/products/:productId', (req, res, next)=>{
  const userIdNum = req.params.userId;
  return User.findOne({
    where: {
      id: userIdNum
    },
    attributes: ['id', 'isAdmin']
  })
  .then(user =>{
    if (user.isAdmin){
      Product.destroy({
        where : {
          id : req.params.productId
        }
      })
      .then(()=>res.sendStatus(204))
    } else {
      res.sendStatus(401)
    }
  })
  .catch(next);
});
