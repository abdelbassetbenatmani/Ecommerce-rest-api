const slugify = require('slugify')
const {check } = require('express-validator');

const validatorMiddleware = require('../../Middleware/validatorMiddleware')
const User = require('../../models/user.model')



exports.signupValidator = [
    check('name').notEmpty().withMessage('the Username is required')
    .isLength({ min: 3 }).withMessage('the Username is too short')
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    check('email').notEmpty().withMessage('the Email is required')
    .isEmail().withMessage('Invalid email address')
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
        if (user) {
            return Promise.reject(new Error('E-mail already in user'));
        }
        })
    ),
    check('password').notEmpty().withMessage('the Password is required')
    .isLength({ min:6}).withMessage('Password must be at least 6 characters')
    .custom((val,{req}) => {
        if(val !== req.body.confirmPassword){
            throw new Error('confirm password incorrect')
        }
        return true
    }),

    check('confirmPassword').notEmpty().withMessage('confirm Password is required'),
    check('phone').optional()
    .isMobilePhone('ar-DZ').withMessage('Invalid phone number'),

    check('profileImg').optional(),
    check('role').optional(),
    validatorMiddleware
]

exports.loginValidator = [ 
    check('email').notEmpty().withMessage('the Email is required')
    .isEmail().withMessage('Invalid email address')
    ,
    check('password').notEmpty().withMessage('the Password is required')
    .isLength({ min:6}).withMessage('Password must be at least 6 characters')
    ,
    validatorMiddleware
]
