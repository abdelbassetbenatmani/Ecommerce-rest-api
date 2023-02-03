const express = require('express')

const route = express.Router()

const {addProductToCart,getLoggedUserCart,removeCartItem,clearCart,updateQuantity,applyCoupon} = require('../controllers/cart.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))
route.route('/').post(addProductToCart).get(getLoggedUserCart).delete(clearCart)
route.route('/applyCoupon').put(applyCoupon)
route.route('/:itemId').delete(removeCartItem).put(updateQuantity)

module.exports = route;