const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    cartItems:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1,
        },
        color:String,
        price:Number,

    }],
    totalCartPrice:Number,
    priceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

},{timestamps: true,})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;