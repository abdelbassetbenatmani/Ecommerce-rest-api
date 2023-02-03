const express = require('express')

const route = express.Router()
const { createProductValidator,deleteProductValidator,getProductValidator,updateProductValidator} = require('../utils/validator/productValidator')
const { createProduct,deleteProduct,getProducts,getSpecificProduct,updateProduct,uploadProductImages,proccesImage } = require('../controllers/product.controller')
const reviewsRoute = require('./review.route')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use('/:productId/reviews',reviewsRoute)
route.route('/').get(getProducts)
    .post(protect,allowedTo('admin','manager'),uploadProductImages,proccesImage ,createProductValidator,createProduct)
route.route('/:id')
    .get(getProductValidator, getSpecificProduct)
    .put(protect,allowedTo('admin','manager'),uploadProductImages,proccesImage,updateProductValidator, updateProduct)
    .delete(protect,allowedTo('admin'),deleteProductValidator,deleteProduct)
module.exports = route;