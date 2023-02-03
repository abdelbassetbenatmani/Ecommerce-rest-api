const slugify = require('slugify')
const { check ,body} = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware')

exports.getBrandValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]

exports.createBrandValidator = [
    check('name').notEmpty().withMessage('the brand name is required')
    .isLength({ min: 3 }).withMessage('the brand name is too short')
    .isLength({ max: 32 }).withMessage('the brand name is too long')
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware]

exports.updateBrandValidator =  [check('id')
    .isMongoId().withMessage('incorrect id format'),
    body('name').optional().custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    })
    , validatorMiddleware]

exports.deleteBrandValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]