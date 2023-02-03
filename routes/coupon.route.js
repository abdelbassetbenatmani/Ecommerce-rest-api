const express = require('express')

const route = express.Router()
// const { getCouponValidator,createCouponValidator,updateCouponValidator,deleteCouponValidator} = require('../utils/validator/CouponValidator')
const { getCoupons,getSpecificCoupon,createCoupon,updateCoupon,deleteCoupon} = require('../controllers/coupon.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('admin','manager'))

route.route('/')
    .get(getCoupons)
    .post(createCoupon)
route.route('/:id')
    .get( getSpecificCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)
module.exports = route;