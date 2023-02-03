const express = require('express')

const route = express.Router()
const { signupValidator,loginValidator} = require('../utils/validator/authValidator')
const {signup,login ,forgotPassword,verifyPassResetCode,resetPassword,activateAccount,sendEmailToActivateAccount,activateUserAccount} = require('../controllers/auth.controller')

route.route('/signup')
     .post(signupValidator,signup)
route.route('/login')
     .post(loginValidator,login)

route.route('/forgotPassword')
     .post(forgotPassword)

route.route('/verifyResetCode')
     .post(verifyPassResetCode)

route.route('/virefied/:tokenLink')
     .post(activateAccount)
route.route('/activate')
     .post(sendEmailToActivateAccount)
route.route('/activate/:token')
     .post(activateUserAccount)

route.route('/resetPassword')
     .put(resetPassword)

module.exports = route;