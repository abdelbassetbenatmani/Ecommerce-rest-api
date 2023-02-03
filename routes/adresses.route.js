const express = require('express')

const route = express.Router()

const {addAdresses,removeAdresses,getLoggedAdresses} = require('../controllers/adresses.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use(protect,allowedTo('user'))

route.route('/')
    .post(addAdresses)
    .get(getLoggedAdresses)
route.route('/:adressesId').delete(removeAdresses)
module.exports = route;