const express = require('express')
const UserController = require('../controllers/usercontroller')
const MassageController = require('../controllers/massagecontroller')
const Authentication = require('../middlewares/authentication')
const ReviewController = require('../controllers/reviewcontroller')
const OrderController = require('../controllers/ordercontroller')


const router = express.Router()

// middleware that is specific to this router

// define the home page route

// define the about route
router.post('/login', UserController.login)
router.post('/register', UserController.register)


router.post('/githubSign', UserController.githubSign)

router.get('/massages', MassageController.allMassages)
router.get('/massages/:massageId', MassageController.detailMassage)
router.get('/massages/:massageId/reviews', ReviewController.getReviews)
router.post('/massages/:massageId/reviews', ReviewController.addReviews)

router.get('/sendMail', Authentication, UserController.sendMail)
router.get('/orders', Authentication, OrderController.getOrders)
router.post('/orders/:massageId', Authentication, OrderController.addOrder)
router.post('/generateMToken', Authentication, UserController.midtransToken)
router.patch('/patchOrders', Authentication, OrderController.patchOrders)
router.delete('/orders/:id', Authentication, OrderController.deleteOrders)











module.exports = router