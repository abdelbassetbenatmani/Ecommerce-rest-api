const factory = require('./handelersFactory');

const Review = require('../models/review.model')

exports.createFilterObj = (req, res, next) => {
    let filterObj = {}
    if (req.params.productId) {
        filterObj = {product:req.params.productId}
    }
    req.filterObj = filterObj
    next()
}

exports.setProductAndUserToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId
    if (!req.body.user) req.body.user = req.user._id
    next()
}
module.exports.createReview = factory.createOne(Review)

module.exports.getReviews = factory.getAll(Review)

module.exports.getSpecificReview = factory.getOne(Review)

module.exports.updateReview = factory.updateOne(Review)

module.exports.deleteReview = factory.deleteOne(Review)