const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,'the order must belong to user']
    },
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
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    totalOrderPrice:{
        type:Number,
    },
    paymentMethod:{
        type:String,
        enum:['card', 'cash'],
        default:'cash'
    },
    shippingAdress:{
        details:String,
        phone:String,
        city:String,
        postalCode:String
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,

},{timestamps:true})

orderSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'user',
      select: 'name profileImg email phone',
    }).populate({
      path: 'cartItems.product',
      select: 'title imageCover ',
    });
  
    next();
  });

const Order = mongoose.model('Order',orderSchema)
module.exports = Order