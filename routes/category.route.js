const express = require('express')

const route = express.Router()
const { getCategoryValidator,createCategoryValidator,updateCategoryValidator,deleteCategoryValidator} = require('../utils/validator/categoryValidator')
const { createCategory, getCategories, getSpecificCategory, updateCategory, deleteCategory,updoadCategoryFile,proccesImage } = require('../controllers/category.controller')
const subCategoriesRoute = require('./subCategory.route')
const {protect,allowedTo} = require('../controllers/auth.controller')

route.use('/:categoryId/subcategories',subCategoriesRoute)
route.route('/').get(getCategories)
    .post(protect,allowedTo('admin','manager'),updoadCategoryFile,proccesImage,createCategoryValidator,createCategory)
route.route('/:id')
    .get(getCategoryValidator, getSpecificCategory)
    .put(protect,allowedTo('admin','manager'),updoadCategoryFile,proccesImage,updateCategoryValidator, updateCategory)
    .delete(protect,allowedTo('admin'),deleteCategoryValidator,deleteCategory)
module.exports = route;