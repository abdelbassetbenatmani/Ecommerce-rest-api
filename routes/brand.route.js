const express = require('express')

const route = express.Router()
const { getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator} = require('../utils/validator/brandValidator')
const { createBrand, getBrands, getSpecificBrand, updateBrand, deleteBrand,updoadBrandFile,proccesImage  } = require('../controllers/brand.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.route('/')
    .get(getBrands)
    .post(protect,allowedTo('admin','manager'),updoadBrandFile,proccesImage ,createBrandValidator,createBrand)
route.route('/:id')
    .get(getBrandValidator, getSpecificBrand)
    .put(protect,allowedTo('admin','manager'),updoadBrandFile,proccesImage ,updateBrandValidator, updateBrand)
    .delete(protect,allowedTo('admin'),deleteBrandValidator,deleteBrand)
module.exports = route;