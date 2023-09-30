// const GoogleStrategy = require('passport-google-oauth20').Strategy

// const User = require('../models/user.model')

// module.exports = function (passport){
//     passport.use(
//         new GoogleStrategy({
//             clientID:process.env.GOOGLE_CLIENT_ID,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL:"http://localhost:3000/api/v1/auth/google/callback"
//         },
//         async (accessToken, refreshToken, profile, done)=>{

           
//             try {
//                 let user = await User.findOne({ googleId: profile.id })
//                 if(user){
//                     done(null, user)
                    
//                 }else{
//                     const newUser = {
//                         googleId:profile.id,
//                         name:profile.displayName,
//                         email:profile.emails[0].value,
//                         profileImg: profile.photos[0].value,
//                     }
//                     user = await User.create(newUser)
//                     done(null, user)
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         })
//     )
//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => done(err, user))
//     })
// }