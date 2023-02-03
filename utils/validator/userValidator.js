const slugify = require('slugify')
const {check ,body} = require('express-validator');
const bcrypt = require('bcryptjs');

const validatorMiddleware = require('../../Middleware/validatorMiddleware')
const User = require('../../models/user.model')

exports.getUserValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]

exports.createUserValidator = [
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
    validatorMiddleware]

exports.updateUserValidator =  [check('id')
    .isMongoId().withMessage('incorrect id format'),
    body('name').optional()
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    body('email').optional()
    .isEmail().withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
    check('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    check('profileImg').optional(),
    check('role').optional()
    , validatorMiddleware]

exports.updateLoggedUserValidator =  [
    body('name').optional()
    .custom((val,{req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    body('email').optional()
    .isEmail().withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
    check('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    check('profileImg').optional()
    , validatorMiddleware]

exports.changePasswordValidator = [
    check('id')
    .isMongoId().withMessage('incorrect id format'),
    body('currentpassword').notEmpty().withMessage('you must enter current password'),
    body('confirmpassword').notEmpty().withMessage('you must enter confirm password'),
    body('password').notEmpty().withMessage('you must enter new password').custom(async (val,{req})=>{
        // 1- verify current password
        const user = await User.findById(req.params.id)
        if(!user){
            throw new Error('there is no user for this id')
        }
        const isCorrectPassword = await bcrypt.compare(req.body.currentpassword, user.password)
        if(!isCorrectPassword){
            throw new Error('the current password is incorrect')
        }
        // 2- verify confirm password
        if(val !== req.body.confirmpassword){
            throw new Error('password confrmation  is incorrect')
        }
        return true
    })
    ,validatorMiddleware]


exports.deleteUserValidator = [check('id')
    .isMongoId().withMessage('incorrect id format'), validatorMiddleware]