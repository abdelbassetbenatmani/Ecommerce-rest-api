const slugify = require('slugify')
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware')
// const Category = require('../models/category.model')
exports.getCategoryValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]

exports.createCategoryValidator = [check('name')
    .notEmpty().withMessage('the name is required')
    .isLength({ min: 3 }).withMessage('the name is too short')
    .isLength({ max: 32 }).withMessage('the name is too long')
    .custom((val, { req }) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware]

exports.updateCategoryValidator =  [check('id')
    .isMongoId().withMessage('incorrect id format'), body('name').optional().custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    })
    , validatorMiddleware]

exports.deleteCategoryValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]
