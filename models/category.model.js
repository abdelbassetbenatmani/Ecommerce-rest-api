const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        minlength: [3, 'the name is too short'],
        maxlength: [32, 'the name is too long'],
        unique:[true,'the name must be unique']
    },
    slug: {
        type:String,
        lowercase: true,
    },
    image:String
}, { timestamps: true })

const setImageUrl = (doc)=>{
    if(doc.image){
        const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`
        doc.image = imageURL;
    }

}
// getAll,getOne,update
categorySchema.post('init',(doc)=>{
    setImageUrl(doc);
})
// create
categorySchema.post('save',(doc)=>{
    setImageUrl(doc);
})

const Category = mongoose.model('category', categorySchema)
module.exports = Category