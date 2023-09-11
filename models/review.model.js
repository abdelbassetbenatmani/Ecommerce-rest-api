const mongoose = require('mongoose');

const Product = require('./product.model')

const reviewSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    rating:{
        type:Number,
        min:[1,'Min rating value is 1'],
        max:[5,'Max rating value is 5'],
        required:[true,'review rating required']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,'Review must belong to user']
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:[true,'Review must belong to product']
    }

},{timestamps: true})

reviewSchema.statics.calcAvrageAndQuantityRatings = async function(productId){
    const result = await this.aggregate([
        {$match:{product:productId}},
        {$group:{_id:'product',averageRatings:{$avg:'$rating'},ratingsQuantity:{$sum:1}}}
    ])
    if(result.length>0){
        await Product.findByIdAndUpdate(productId,{ratingsAverage:result[0].averageRatings,ratingsQuantity:result[0].ratingsQuantity})
    }else{
        await Product.findByIdAndUpdate(productId,{ratingsAverage:0,ratingsQuantity:0})
    }
}

reviewSchema.post('save',async function(){
    await this.constructor.calcAvrageAndQuantityRatings(this.product)
})

reviewSchema.post('remove',async function(){
    await this.constructor.calcAvrageAndQuantityRatings(this.product)
})

reviewSchema.pre(/^find/,function(next){
    this.populate({path:'user',select:'name'});
    next();
})
const Review = mongoose.model('Review',reviewSchema)

module.exports = Review