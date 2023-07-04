const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const regSuppliersSchema = new Schema({
    
    

    name : {
        type : String,
        required:true

    },
    email : {
        type: String,
        required:true
    },
    company:{
        type:String,
        required:true

    },
    experience : {
        type : String,
        required:true

    },
    medicine_type : {
        type : String,
        required:true

    },
    phone_number : {
        type : Number,
        required:true

    },
    password : {
        type : String,
        required:true

    }
    
})

const regSuppliers = mongoose.model("regSuppliers",regSuppliersSchema);

module.exports= regSuppliers;