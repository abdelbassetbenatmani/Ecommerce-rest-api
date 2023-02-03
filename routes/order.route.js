const express = require('express')

const route = express.Router()

const {createCashOrder,filterOrderForLoggedUser,getAllOrders,getSpecificOrder,updateOrderDeliver,updateOrderPaid,createCheckoutSession} = require('../controllers/order.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect)

route.get('/checkout-session/:cartId',allowedTo('user'),createCheckoutSession)
route.route('/:cartId').post(allowedTo('user'),createCashOrder)

route.route('/').get(allowedTo('user','admin','manager'),filterOrderForLoggedUser,getAllOrders)
route.route('/:id').get(getSpecificOrder)
route.put('/:id/pay',allowedTo('admin','manager'),updateOrderPaid)
route.put('/:id/deliver',allowedTo('admin','manager'),updateOrderDeliver)

module.exports = route