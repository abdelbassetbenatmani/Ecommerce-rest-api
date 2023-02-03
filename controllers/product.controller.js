const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const factory = require('./handelersFactory');
const { uploadMixOfImages } = require('../Middleware/uploadImageMiddleware');
const Product = require('../models/product.model')

module.exports.uploadProductImages = uploadMixOfImages([
    {
      name: 'imageCover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 5,
    },
  ])

module.exports.proccesImage =asyncHandler(async (req,res,next)=>{
     //1- Image processing for imageCover
     if(req.files.imageCover){
        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
      .resize(800, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images) {
        req.body.images = [];
        await Promise.all(
          req.files.images.map(async (img, index) => {
            const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
    
            await sharp(img.buffer)
              .resize(800, 600)
              .toFormat('jpeg')
              .jpeg({ quality: 95 })
              .toFile(`uploads/products/${imageName}`);
    
            // Save image into our db
            req.body.images.push(imageName);
          })
        );
    
      }
      next();
})  
module.exports.createProduct = factory.createOne(Product)

module.exports.getProducts = factory.getAll(Product,'Products')

module.exports.getSpecificProduct = factory.getOne(Product,'reviews')

module.exports.updateProduct = factory.updateOne(Product)

module.exports.deleteProduct = factory.deleteOne(Product)