const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler')

const factory = require('./handelersFactory');
const {uploadSingleImage}= require('../Middleware/uploadImageMiddleware')
const subCategory = require('../models/subCategoryModel')

exports.setCategoryToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryId
    }
    next()
}
exports.createFilterObj = (req, res, next) => {
    let filterObj = {}
    if (req.params.categoryId) {
        filterObj = {category:req.params.categoryId}
    }
    req.filterObj = filterObj
    next()
}

module.exports.updoadSubCategoryFile = uploadSingleImage('image')

module.exports.proccesImage =asyncHandler(async (req,res,next)=>{
    const filename = `subcategory-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){

    
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality: 95})
        .toFile(`uploads/subcategories/${filename}`)
    
    // save image to db    
    req.body.image = filename;
    }
    next()
})

module.exports.createSubCategory = factory.createOne(subCategory)

module.exports.getSubCategories = factory.getAll(subCategory)

module.exports.getSpecificSubCategory = factory.getOne(subCategory)

module.exports.updateSubCategory = factory.updateOne(subCategory)

module.exports.deleteSubCategory = factory.deleteOne(subCategory)