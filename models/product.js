const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    count:String,
    price:String,
    description:String
})

exports.Product = mongoose.model('Product', productSchema);
