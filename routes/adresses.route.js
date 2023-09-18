const express = require('express')

const route = express.Router()

const {addAdresses,removeAdresses,getLoggedAdresses, updateAdress,getSpecificAddress} = require('../controllers/adresses.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))

route.route('/')
    .post(addAdresses)
    .get(getLoggedAdresses)
route.route('/:adressesId')
            .get(getSpecificAddress)
            .delete(removeAdresses)
            .put(updateAdress)
module.exports = route;