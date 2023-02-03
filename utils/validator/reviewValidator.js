const { check} = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware')

const Review = require('../../models/review.model')

exports.getReviewValidator = [check('id')
    .isMongoId().withMessage('incorrect review id format'), validatorMiddleware]

exports.createReviewValidator = [
    check('title').optional(),
    check('rating').notEmpty().withMessage('rating is required')
    .isFloat({min: 1, max:5}).withMessage('rating must be between 1 and 5'),
    check('user')
    .isMongoId().withMessage('incorrect user id format'),
    check('product')
    .isMongoId().withMessage('incorrect product id format')
    .custom((val, { req }) =>
    // Check if logged user create review before
    Review.findOne({ user: req.user._id, product: req.body.product }).then(
      (review) => {
        console.log(review);
        if (review) {
          return Promise.reject(
            new Error('You already created a review before')
          );
        }
      }
    )
  ),
    validatorMiddleware]

exports.updateReviewValidator =  [check('id')
    .isMongoId().withMessage('incorrect id format') .custom((val, { req }) =>
      // Check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
    validatorMiddleware]

exports.deleteReviewValidator = [check('id')
.isMongoId()
.withMessage('Invalid Review id format')
.custom((val, { req }) => {
  // Check review ownership before update
  if (req.user.role === 'user') {
    return Review.findById(val).then((review) => {
      if (!review) {
        return Promise.reject(
          new Error(`There is no review with id ${val}`)
        );
      }
      if (review.user._id.toString() !== req.user._id.toString()) {
        return Promise.reject(
          new Error(`Your are not allowed to perform this action`)
        );
      }
    });
  }
  return true;
}), validatorMiddleware]