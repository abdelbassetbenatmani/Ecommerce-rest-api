const multer = require('multer');

const ApiError = require('../utils/apiError');

const multerOption = ()=>{
    const multerStorage =  multer.memoryStorage();
    const multerFilter = function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb(new ApiError("Only images Allowed",400))
        }
    }
    const upload = multer({storage:multerStorage,fileFilter:multerFilter})
    return  upload
}
exports.uploadSingleImage = (fieldName)=> multerOption().single(fieldName)

exports.uploadMixOfImages = (arrayOfFields)=> multerOption().fields(arrayOfFields)