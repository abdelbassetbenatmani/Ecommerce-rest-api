const jwt = require('jsonwebtoken');


exports.generateToken = (payload)=> jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRATION_LOGIN })

exports.generateRefreshToken = (payload)=> jwt.sign({userId:payload},process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.JWT_REFRESH_EXPIRE})

// module.exports ={generateToken,generateRefreshToken};

