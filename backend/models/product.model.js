const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    color:Number,
    quanlity:Number,
    imagesLink:String
});

const product = mongoose.model('products',productSchema);

module.exports =  product;