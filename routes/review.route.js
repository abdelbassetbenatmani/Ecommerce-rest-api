const express = require('express')

const route = express.Router({mergeParams:true})
const { getReviewValidator,createReviewValidator,updateReviewValidator,deleteReviewValidator} = require('../utils/validator/reviewValidator')
const { createReview, getReviews, getSpecificReview, updateReview, deleteReview ,createFilterObj,setProductAndUserToBody } = require('../controllers/review.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.route('/')
    .get(createFilterObj,getReviews)
    .post(protect,allowedTo("user"),setProductAndUserToBody,createReviewValidator,createReview)
route.route('/:id')
    .get( getReviewValidator,getSpecificReview)
    .put(protect,allowedTo("user"),updateReviewValidator, updateReview)
    .delete(protect,allowedTo('admin','manager','user'),deleteReviewValidator,deleteReview)

module.exports = route;