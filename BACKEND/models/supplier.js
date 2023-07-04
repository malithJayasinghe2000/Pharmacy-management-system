const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    
    

    name : {
        type : String,
        required:true

    },
    email:{
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
    gender : {
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

    },
    re_type_pass : {
        type : String,
        required:true

    },
    accept_terms: {
        type: Boolean,
        required: true
      }
    
})

const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports= Supplier;
