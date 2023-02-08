const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');

const factory = require('./handelersFactory');
const {uploadSingleImage}= require('../Middleware/uploadImageMiddleware')
const apiError = require('../utils/apiError')
const generateToken = require('../utils/generateToken')

const User = require('../models/user.model')

module.exports.updoadUserFile = uploadSingleImage('profileImg')

module.exports.proccesImage =asyncHandler(async (req,res,next)=>{
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`
    if(req.file){
        await sharp(req.file.buffer)
        .resize(200,200)
        .toFormat("jpeg")
        .jpeg({quality: 95})
        .toFile(`uploads/users/${filename}`)
    
    // save image to db    
    req.body.profileImg = filename; 
    }
    next()
})

module.exports.createUser = factory.createOne(User)

module.exports.getUsers = factory.getAll(User)

module.exports.getSpecificUser = factory.getOne(User)

module.exports.deleteUser = factory.deleteOne(User)

module.exports.updateUser = asyncHandler(async (req, res,next) => {
    const document = await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        role:req.body.role,
        profileImg: req.body.profileImg,
    }, { new: true })
    if (!document) {
        // eslint-disable-next-line new-cap
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})

exports.changePassword = asyncHandler(async (req, res,next) => {
    const document = await User.findByIdAndUpdate(req.params.id,{
        password : await bcrypt.hash(req.body.password,12),
        passwordChangedAt:Date.now()
    }, { new: true })
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})

exports.getLoggedUserData = asyncHandler(async (req, res,next) =>{
    req.params.id = req.user._id;
    next();
});

exports.updateLoggedUserPassword = asyncHandler(async (req, res,next) =>{
    const user = await User.findByIdAndUpdate(req.user._id,{
        password : await bcrypt.hash(req.body.password,12),
        passwordChangedAt:Date.now()
    }, { new: true })

    const token = generateToken(user._id,process.env.JWT_EXPIRATION_LOGIN)
    res.status(200).json({data:user,token})
})

exports.updateLoggedUserData = asyncHandler(async (req, res,next) =>{
    console.log(req.file);
    const user = await User.findByIdAndUpdate(req.user._id,{
        name : req.body.name,
        email : req.body.email,
        phone:req.body.phone,
        profileImg:req.body.profileImg 
    }, { new: true })

    res.status(200).json({data:user})
})

exports.deleteLoggedUser = asyncHandler(async (req, res,next) =>{
    await User.findByIdAndUpdate(req.user._id,{
        active:false
    }, { new: true })

    res.status(204).json({status:'success'})
})



