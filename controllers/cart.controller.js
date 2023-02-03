const asyncHandler = require('express-async-handler')

const apiError = require('../utils/apiError')

const Cart = require('../models/cart.model')
const Coupon = require('../models/coupon.model')
const Product = require('../models/product.model')

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.priceAfterDiscount = undefined;
    return totalPrice;
  };

exports.addProductToCart = asyncHandler(async (req,res,next)=>{
    const { productId, color } = req.body;
    const product = await Product.findById(productId);
    // 1) Get Cart for logged user
    let cart = await Cart.findOne({ user: req.user._id });
  
    if (!cart) {
      // create cart fot logged user with product
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [{ product: productId, price:product.price,color }],
      });
    } else {
      // product exist in cart, update product quantity
      const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId && item.color === color
      );
  
      if (productIndex > -1) {
        const cartItem = cart.cartItems[productIndex];
        cartItem.quantity += 1;
  
        cart.cartItems[productIndex] = cartItem;
      } else {
        // product not exist in cart,  push product to cartItems array
        cart.cartItems.push({ product: productId, color, price: product.price });
      }
    }
  
    // Calculate total cart price
    calcTotalCartPrice(cart);
    await cart.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Product added to cart successfully',
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
})

exports.getLoggedUserCart = asyncHandler(async (req,res,next)=>{
  const cart = await  Cart.findOne({user:req.user._id})
  if(!cart){
    return next(new apiError(`there is no cart for this user id ${req.user._id}`,404))
  }
  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.removeCartItem = asyncHandler(async (req,res,next)=>{
  const cart = await Cart.findOneAndUpdate({user:req.user._id},{
    $pull:{cartItems:{_id:req.params.itemId}}
  },{new:true})

  // Calculate total cart price
  calcTotalCartPrice(cart);
  await cart.save();
  
  res.status(200).json({
      status: 'success',
      numOfCartItems: cart.cartItems.length,
      data: cart,
  });
})

exports.clearCart = asyncHandler(async (req,res,next)=>{
  await Cart.findOneAndDelete({user:req.user._id})
  res.status(204).send();
});

exports.updateQuantity = asyncHandler(async (req,res,next)=>{
  const {quantity} = req.body;
  const cart = await Cart.findOne({user:req.user._id})
  if(!cart){
    return next(new apiError(`there is no cart for this user id ${req.user._id}`,404))
  }
  const itemIndex = cart.cartItems.findIndex(item=>item._id.toString() ===req.params.itemId);
  if(itemIndex>-1){
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  }else{
    return next(new apiError(`there is no item for this id ${req.params._id}`,404))

  }
   // Calculate total cart price
   calcTotalCartPrice(cart);
   await cart.save();
 
   res.status(200).json({
     status: 'success',
     message: 'Product quantity  updated successfully',
     numOfCartItems: cart.cartItems.length,
     data: cart,
   });
});

exports.applyCoupon = asyncHandler(async (req, res,next) => {
  // get coupon based on coupon name
  const coupon = await Coupon.findOne({
     name: req.body.coupon,
     expire: { $gt: Date.now() },})
  if(!coupon){
    return next(new apiError(`Coupon is invalid or expire`,404))
  }
  let cart = await Cart.findOne({ user: req.user._id });

  const totalPrice = cart.totalCartPrice;
  const priceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2); 
  cart.priceAfterDiscount = priceAfterDiscount

  await cart.save();
  
  res.status(200).json({
      status: 'success',
      numOfCartItems: cart.cartItems.length,
      message:"Coupon applied successfully",
      data: cart,
  });
})