
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require("express").Router();
let products = require("../models/products")

//view new products
router.route("/viewProducts").get((req,res)=>{

    products.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        console.log(err)
    })

})

//update products details
router.route("/updateProduct/:id").put(async(req,res)=>{
    let productID = req.params.id;//fetch id comming from url
    const {product_name,price,medicine_type,description}=req.body;//getting data from req.body for updating

    const updatePrice = {//create a object with nedd to be update data
        product_name,
        price,
        medicine_type,
        description
    }

    const update = await products.findByIdAndUpdate(productID,updatePrice).then(()=>{
        res.status(200).send({status: "Supplier updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with updating data",error: err.message});
 
    })
})

//delete product
router.route("/deleteProduct/:id").delete(async(req,res)=>{//giving url to identify what is want to delete (for that giving id)
    let productID=req.params.id;//getting supllier id from url
    await products.findByIdAndDelete(productID)
    .then(()=>{ //send respond(res) to frontend
        res.status(200).send({status:"supplier deleted"});
    }).catch((err)=>{
        res.status(500).send({status:"error with delete supplier", error:err.message});
    })

})

//adding new products to database
router.route("/addNewProducts").post((req,res)=>{
    
    const product_name=req.body.product_name;
    const price=req.body.price;
    const medicine_type=req.body.medicine_type;
    const description=req.body.description;
    


    const newProducts = new products({
        product_name,
        price,
        medicine_type,
        description


    })

    newProducts.save().then(()=>{
        res.json("product added")//if success
    }).catch((err)=>{//if not success
        console.log(err);
    })

})
module.exports=router;