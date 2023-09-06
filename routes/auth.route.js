const express = require('express')
const passport = require('passport')

const route = express.Router()
const { signupValidator,loginValidator} = require('../utils/validator/authValidator')
const {signup,login ,refreshAccesToken,logout,forgotPassword,verifyPassResetCode,resetPassword,activateAccount,sendEmailToActivateAccount,activateUserAccount} = require('../controllers/auth.controller')

// Google Routes
route.get('/google', passport.authenticate('google', {
     scope: ['profile' ,'email']
   }))

route.get(
     '/google/callback',
     passport.authenticate('google', { failureRedirect: 'http:localhost:5173/404' }),
     (req, res) => {
     //   res.render('dashboard')
          console.log("success")
       res.render('http:localhost:5173/')
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
     .get( (req, res, next) => {
          req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/');
          });
        })

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