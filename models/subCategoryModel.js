const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        minlength: [2, 'the name is too short'],
        maxlength: [32, 'the name is too long'],
        unique:[true,'the name must be unique']
    },
    slug: {
        type:String,
        lowercase: true,
    },
    category:{
        type: mongoose.Schema.ObjectId,
        required: [true, 'Category required'],
        ref: "category",
        
    },
    image:String
}, { timestamps: true })

const setImageUrl = (doc)=>{
    if(doc.image){
        const imageURL = `${process.env.BASE_URL}/subcategories/${doc.image}`
        doc.image = imageURL;
    }

}
// getAll,getOne,update
subCategorySchema.post('init',(doc)=>{
    setImageUrl(doc);
})
// create
subCategorySchema.post('save',(doc)=>{
    setImageUrl(doc);
})

const subCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = subCategory