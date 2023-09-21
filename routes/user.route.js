const express = require('express')

const route = express.Router()
const { getUserValidator,createUserValidator,updateUserValidator,deleteUserValidator,changePasswordValidator,updateLoggedUserValidator} = require('../utils/validator/userValidator')
const { createUser, getUsers, getSpecificUser, updateUser, deleteUser,updoadUserFile,proccesImage ,changePassword,getLoggedUserData,updateLoggedUserPassword ,updateLoggedUserData,deleteLoggedUser,exportUserData} = require('../controllers/user.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

// Logged in user
route.get('/getMe',protect,getLoggedUserData,getSpecificUser)
route.put('/changeMyPassword',protect,getLoggedUserData,changePasswordValidator,updateLoggedUserPassword)
route.put('/changeMyData',protect,updoadUserFile,proccesImage ,updateLoggedUserValidator,updateLoggedUserData)
route.delete('/deleteMe',protect,deleteLoggedUser)

// Admin routes
route.put('/changepassword/:id',changePasswordValidator,changePassword)
route.route('/')
    .get(protect,allowedTo('admin','manager'),getUsers)
    .post(protect,allowedTo('admin','manager'),updoadUserFile,proccesImage ,createUserValidator,createUser)
route.route('/exports').get(protect,allowedTo('admin'),exportUserData)    
route.route('/:id')
    .get( protect,allowedTo('admin'),getUserValidator,getSpecificUser)
    .put(protect,allowedTo('admin'),updoadUserFile,proccesImage ,updateUserValidator, updateUser)
    .delete(protect,allowedTo('admin'),deleteUserValidator,deleteUser)
module.exports = route;