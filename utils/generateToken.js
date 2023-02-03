const jwt = require('jsonwebtoken');

const generateToken = (payload,expired)=> jwt.sign({userId:payload},process.env.JWT_SECRET,{expiresIn:expired})

// const generateTokenVerifyEmail = (payload)=> jwt.sign({email:payload},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION_ACTIVATE})

module.exports =generateToken;

