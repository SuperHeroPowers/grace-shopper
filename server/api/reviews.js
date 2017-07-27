const router = require('express').Router()
const {Reviews} = require('../db/models')
module.exports = router

// reviews by product
// reviews by user

// GET all Reviews
router.get('/', (req, res, next) => {
    Reviews.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['review', 'rating']
    })
        .then(users => res.json(users))
        .catch(next)
})

// GET review by ID
api.get('/:reviewId', (req, res, next) => {
    var reviewId=req.params.reviewId;

    if(!Number(reviewId)){res.sendStatus(500);}
    else{
        Reviews.findAll({where:{id:reviewId}, include: [ Products, Users ]})
            .then(function (data) {
                if(data){res.json(data)}
                else{
                    res.sendStatus(404);
                }
            });
    }

});

// GET all reviews for each Product
api.get('/:productId', (req, res, next) => {
    var productId=req.params.productId;

    if(!Number(productId)){res.sendStatus(500);}
    else{
        Reviews.findAll({where:{id:productId}, include: [ Products, Users ]})
            .then(function (data) {
                if(data){res.json(data)}
                else{
                    res.sendStatus(404);
                }
            });
    }

});

// GET all reviews for each User
api.get('/:userId', (req, res, next) => {
    var userId=req.params.userId;

    if(!Number(userId)){res.sendStatus(500);}
    else{
        Reviews.findAll({where:{id:userId}, include: [ Users ]})
            .then(function (data) {
                if(data){res.json(data)}
                else{
                    res.sendStatus(404);
                }
            });
    }

});

// ADD Review
api.post('/new', (req, res, next) => {
    var studentFirst=req.body.firstName;
    var studentLast=req.body.lastName;
    var studentEmail=req.body.email;
    var studentImage=req.body.image;
    var studentCampus=Number(req.body.campusId);
    console.log("TEST", req.body);

    Reviews.create({
        firstName: studentFirst,
        lastName: studentLast,
        email: studentEmail,
        image: studentImage,
        campusId: studentCampus
    })
        .then(function (data) {
            console.log("DATA",data);
            res.sendStatus(201);
        })
        .catch(next);

});

// EDIT Review
api.put('/edit/:reviewId', (req, res, next) => {
    var reviewId=req.params.reviewId;
    var reviewUserId=req.body.userId;
    var reviewProductId=req.body.productId;
    var reviewDescription=req.body.description;
    var reviewRating=Number(req.body.campusId);

    if(!Number(studentId)){res.sendStatus(500);}
    else{
        Students.findById(studentId)
            .then(function (data) {
                if(data){
                    data.update({
                        firstName: studentFirst,
                        lastName: studentLast,
                        email: studentEmail,
                        image: studentImage,
                        campusId: studentCampus
                    })
                        .then(function() {
                            res.send(data);
                        });
                }
                else{
                    res.sendStatus(404);
                }
            });
    }
});

// DELETE Review
api.delete('/:reviewId', (req, res, next) => {
    var reviewId=req.params.reviewId;

    if(!Number(reviewId)){res.sendStatus(500)}
    else {
        Students.findById(reviewId)
            .then(function (data) {
                if (data) {
                    res.status(204);
                    data.destroy({force: true})
                        .then(function (data) {
                            res.send(data);
                        });
                }
                else {
                    res.sendStatus(404);
                }
            });
    }
});