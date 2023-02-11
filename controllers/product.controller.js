const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const exceljs = require('exceljs');


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

exports.exportProductData = asyncHandler(async (req, res,next) =>{
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('Products');
  worksheet.columns = [
      {header:"title",key:"title",width:60},
      {header:"description",key:"description",width:100},
      {header:"quantity",key:"quantity",width:12},
      {header:"sold",key:"sold" ,width:12},
      {header:"price",key:"price" ,width:12},
      {header:"colors",key:"colors" ,width:30},
      {header:"category",key:"category" ,width:30},
      {header:"ratingsAverage",key:"ratingsAverage" ,width:15},
      {header:"ratingsQuantity",key:"ratingsQuantity" ,width:15},
  ];
  let count = 1;

  const products = await Product.find({}).populate({
    path: 'category',
    select: 'name -_id'
});
  if(!products){
      return next(new apiError('Products not found',404)) 
  }
  products.forEach((product)=>{
      product.s_no = count;
      worksheet.addRow(product)
      // eslint-disable-next-line no-plusplus
      count ++;
  })
  worksheet.getRow(1).eachCell((cell)=>{
      cell.font = {bold:true}
  })

  // save workbook to disk
  workbook
  .xlsx
  .writeFile('products.xlsx')
  .then(() => {
      console.log("saved");
      res.download("products.xlsx",()=> {
          console.log("download");
      })
  })
  .catch((err) => {
      console.log("err", err);
  });
})