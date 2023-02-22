const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    googleId:{
        type:String,
        default:null,
    },
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true
    },
    slug:{
        type: String,
        lowercase:true
    },
    email:{
        type: String,
        required:[true,'email is required'],
        unique:true,
        lowercase:true
    },
    phone:String,
    profileImg:String,
    password:{
        type: String,
        required:[true,'password is required'],
        minlength:6,
    },
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetCodeExpired:Date,
    passwordResetCodeVerify:Boolean,
    role:{
        type: String,
        enum:['user','manager','admin'],
        default: 'user',
    },
    active:{
        type: Boolean,
        default:true,
    }
    ,
    emailactive:{
        type: Boolean,
        default:false,
    },
    wishlist:[{ type:mongoose.Schema.ObjectId,ref:'Product'}],
    adresses:[{
        id:{type:mongoose.Schema.Types.ObjectId,},
        alias:String,
        details:String,
        phone:String,
        city:String,
        postalCode:String

    }]
},{timestamps:true})


const setImageUrl = (doc)=>{
    if(doc.profileImg){
        const imageURL = `${process.env.BASE_URL}/users/${doc.image}`
        doc.profileImg = imageURL;
    }

}
// getAll,getOne,update
userSchema.post('init',(doc)=>{
    setImageUrl(doc);
})
// create
userSchema.post('save',(doc)=>{
    setImageUrl(doc);
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
})
const User = mongoose.model('User',userSchema);
module.exports = User;