const express = require('express')

const route = express.Router({mergeParams: true})
const {createSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator} = require('../utils/validator/subCategoryValidator')
const { createSubCategory, getSubCategories, getSpecificSubCategory, updateSubCategory, deleteSubCategory, setCategoryToBody, createFilterObj,updoadSubCategoryFile,proccesImage } = require('../controllers/subCategory.controller')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.route('/')
    .post(protect,allowedTo('admin','manager'),updoadSubCategoryFile,proccesImage,setCategoryToBody,createSubCategoryValidator, createSubCategory)
    .get(createFilterObj,getSubCategories)
route.route("/:id")
    .get(getSubCategoryValidator, getSpecificSubCategory)    
    .put(protect,allowedTo('admin','manager'),updoadSubCategoryFile,proccesImage,updateSubCategoryValidator, updateSubCategory)
    .delete(protect,allowedTo('admin'),deleteSubCategoryValidator, deleteSubCategory)
module.exports = route