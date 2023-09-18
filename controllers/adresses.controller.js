const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");

exports.addAdresses = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { adresses: req.body } },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.adresses });
});

exports.removeAdresses = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { adresses: { _id: req.params.adressesId } } },
    { new: true }
  );
  res.status(200).json({ status: "success", data: user.adresses });
});

exports.updateAdress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const address = user.adresses.id(req.params.adressesId);

  address.alias = req.body.alias || address.alias;
  address.details = req.body.details || address.details;
  address.phone = req.body.phone || address.phone;
  address.city = req.body.city || address.city;
  address.postalCode = req.body.postalCode || address.postalCode;

  await user.save();
  return res.status(200).json({
    status: "success",
    message: "Address updated successfully",
    data: address,
  });
});

exports.getLoggedAdresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("adresses");
  res.status(200).json({
    status: "success",
    result: user.adresses.length,
    data: user.adresses,
  });
});

exports.getSpecificAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const address = user.adresses.id(req.params.adressesId);
  return res.status(200).json({
    status: "success",
    data: address,
  });
});
