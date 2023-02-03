const factory = require('./handelersFactory');

const Coupon = require('../models/coupon.model')



module.exports.createCoupon = factory.createOne(Coupon)

module.exports.getCoupons = factory.getAll(Coupon)

module.exports.getSpecificCoupon = factory.getOne(Coupon)

module.exports.updateCoupon = factory.updateOne(Coupon)

module.exports.deleteCoupon = factory.deleteOne(Coupon)