const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Coupon name required'],
        trim:true
    },
    expire:{
        type:Date,
        required:[true,'Coupon expiration date required'],

    },
    discount:{
        type:Number,
        required:[true,'Coupon discount value required'],
    }
},{timestamps:true})

const Coupon = mongoose.model('Coupon',couponSchema);

module.exports = Coupon;