const express = require('express')
const passport = require('passport')

const route = express.Router()
const { signupValidator,loginValidator} = require('../utils/validator/authValidator')
const {signup,login ,refreshAccesToken,logout,forgotPassword,verifyPassResetCode,resetPassword,activateAccount,sendEmailToActivateAccount,activateUserAccount} = require('../controllers/auth.controller')

// Google Routes
route.get('/google', passport.authenticate('google', {
     scope: ['profile', 'email']
   }))

route.get(
     '/google/callback',
     passport.authenticate('google', { failureRedirect: '/' }),
     (req, res) => {
       res.redirect('/dashboard')
     }
   )

route.route('/signup')
     .post(signupValidator,signup)
route.route('/login')
     .post(loginValidator,login)

route.route('/refresh-token')
     .post(refreshAccesToken)

route.route('/logout')
     .delete(logout)

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