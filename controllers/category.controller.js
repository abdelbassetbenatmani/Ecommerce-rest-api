const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler')

const factory = require('./handelersFactory');
const {uploadSingleImage}= require('../Middleware/uploadImageMiddleware')
const Category = require('../models/category.model')




module.exports.updoadCategoryFile = uploadSingleImage('image')

module.exports.proccesImage =asyncHandler(async (req,res,next)=>{
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality: 95})
        .toFile(`uploads/categories/${filename}`)
    
    // save image to db    
    req.body.image = filename;
    }
    next()
})
module.exports.createCategory = factory.createOne(Category)

module.exports.getCategories = factory.getAll(Category)

module.exports.getSpecificCategory = factory.getOne(Category)

module.exports.updateCategory = factory.updateOne(Category)

module.exports.deleteCategory = factory.deleteOne(Category)