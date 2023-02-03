const asyncHandler = require('express-async-handler')

const User = require('../models/user.model')

exports.addAdresses = asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user._id,
        {$addToSet:{adresses:req.body}},
        {new:true})
    res.status(200).json({status: 'success',data: user.adresses})    
})

exports.removeAdresses= asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.user._id,
        {$pull:{adresses:{_id:req.params.adressesId}}},
        {new:true})
    res.status(200).json({status: 'success',data: user.adresses})    
})

exports.getLoggedAdresses= asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.user._id).populate('adresses')
    res.status(200).json({status: 'success',result:user.adresses.length,data: user.adresses})  

})