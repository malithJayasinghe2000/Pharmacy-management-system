const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require("express").Router();
let orders = require("../models/orders")
let product = require("../models/products")


// Get available medicine types from products
router.get('/medicine_types', async (req, res) => {
    try {
      const products = await product.find();
      const medicineTypes = [...new Set(products.map(p => p.medicine_type))];
      res.json(medicineTypes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

//add orders to database
router.route("/addOrders").post((req,res)=>{
    
    const product_name=req.body.product_name;
    const quantity=req.body.quantity;
    const medicine_type=req.body.medicine_type;
    


    const newOrder = new orders({

        product_name,
        quantity,
        medicine_type
        

    })

    newOrder.save().then(()=>{
        res.json("Order added")//if success
    }).catch((err)=>{//if not success
        console.log(err);
    })

})

//view orders
router.route("/viewOrders").get((req,res)=>{

    orders.find().then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })

})

//delete orders
router.route("/deleteOrders/:id").delete(async(req,res)=>{//giving url to identify what is want to delete (for that giving id)
    let orderId=req.params.id;//getting supllier id from url
    await orders.findByIdAndDelete(orderId)
    .then(()=>{ //send respond(res) to frontend
        res.status(200).send({status:"order deleted"});
    }).catch((err)=>{
        res.status(500).send({status:"error with delete order", error:err.message});
    })

})

module.exports = router;