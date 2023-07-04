const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    

    product_name : {
        type : String,
        required:true

    },
    price:{
        type:Number,
        required:true

    },
    medicine_type : {
        type : String,
        required:true

    },
    description : {
        type : String,
        required:true

    }
    
    
})

const products = mongoose.model("products",productSchema);

module.exports= products;
