const express = require('express')

const route = express.Router()

const {addProductToWishlist,removeProductFromWishlist,getLoggedUserWishList} = require('../controllers/wishlist.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))

route.route('/')
    .post(addProductToWishlist)
    .get(getLoggedUserWishList)
route.route('/:productId').delete(removeProductFromWishlist)
module.exports = route;