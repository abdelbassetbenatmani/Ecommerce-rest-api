const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler')

const factory = require('./handelersFactory');
const {uploadSingleImage}= require('../Middleware/uploadImageMiddleware')
const Brand = require('../models/brand.model')

module.exports.updoadBrandFile = uploadSingleImage('image')

module.exports.proccesImage =asyncHandler(async (req,res,next)=>{
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
    await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality: 95})
        .toFile(`uploads/brands/${filename}`)
    
    // save image to db    
    req.body.image = filename;
    }
    next()
})

module.exports.createBrand = factory.createOne(Brand)

module.exports.getBrands = factory.getAll(Brand)

module.exports.getSpecificBrand = factory.getOne(Brand)

module.exports.updateBrand = factory.updateOne(Brand)

module.exports.deleteBrand = factory.deleteOne(Brand)