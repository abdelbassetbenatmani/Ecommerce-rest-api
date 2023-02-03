const slugify = require('slugify')
const { check,body } = require('express-validator');
const validatorMiddleware = require('../../Middleware/validatorMiddleware')

exports.getSubCategoryValidator = [check('id')
    .isMongoId().withMessage('incorrect Sub Category id format'), validatorMiddleware]

exports.createSubCategoryValidator = [
    check('name')
    .notEmpty().withMessage('the sub Category is required')
    .isLength({ min: 2 }).withMessage('the sub Category is too short')
    .isLength({ max: 32 }).withMessage('the sub Category is too long')
    .custom((val,{req}) => {
            req.body.slug = slugify(val)
            return true
    }),
    check('category')
    .notEmpty().withMessage('the category is required')
    .isMongoId().withMessage('incorrect category id format'),
    validatorMiddleware]

exports.updateSubCategoryValidator =  [check('id')
    .isMongoId().withMessage('incorrect id format')
    , body('name').optional().custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    })
    , validatorMiddleware]

exports.deleteSubCategoryValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]