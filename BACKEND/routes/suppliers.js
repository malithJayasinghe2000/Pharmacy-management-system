
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require("express").Router();
let regSuppliers = require("../models/regSuppliers");
let Supplier = require("../models/supplier");
const { get } = require('mongoose');

//fetch medicine type
router.get('/fetch/:medicineType', async (req, res) => {
    const { medicineType } = req.params;
    try {
      const suppliers = await regSuppliers.find({ medicine_type: medicineType });
      res.json(suppliers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

//fetch one registered supplier from id
router.route("/getReg/:id").get(async(req,res)=>{
    let supId=req.params.id;
    const sup = await regSuppliers.findById(supId).then((regSuppliers)=>{
        res.status(200).send({status:"supplier fetched",regSuppliers})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user"});

    })
})

//forgot pass
router.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;
  
      // TODO: Validate the email address and check if it exists in the database
  
      // Generate a new password and update it in the database
      const newPassword = generateNewPassword();
      // TODO: Update the password for the user in the database
  
      // Send the new password to the user's email address
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "malith2jayasinghe@gmail.com", // Replace with your Gmail email address
          pass: "wwe2k123456789", // Replace with your Gmail password
        },
      });
  
      const mailOptions = {
        from: "malith2jayasinghe@gmail.com", // Replace with your Gmail email address
        to: email,
        subject: "New Password",
        text: `Your new password is: ${newPassword}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.json({ message: "A new password has been sent to your email address." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to reset password. Please try again." });
    }
  });
  
  // Start the server
 
  
  function generateNewPassword() {
    // TODO: Generate a new password using a secure method and return it
    return "new_password";
  }


//for search
router.get('/searchRegSuppliers', async (req, res) => {
    // const {q}=req.query;
    //  const suppliers=regSuppliers.find({$regex:q})

    // const keys=["name","company"];

    // const search = (data)=>{
    //     return data.filter((item)=>
    //     keys.some((key)=>item[key].toLowerCase().include(q))
    //     )
    // }
    // res.json(search(regSuppliers))


    try {
        const { search } = req.query;
        let suppliers = await regSuppliers.find();

        if (search) {
            suppliers = suppliers.filter((supplier) =>
                supplier.name.toLowerCase().includes(search.toLowerCase()) ||
                supplier.company.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.status(200).json({ success: true, suppliers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

  
//view registered supplier
router.route("/viewRegSuppliers").get((req,res)=>{

    regSuppliers.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })

})

//delete registere supplier
router.route("/deleteRegSupplier/:id").delete(async(req,res)=>{//giving url to identify what is want to delete (for that giving id)
    let supId=req.params.id;//getting supllier id from url
    await regSuppliers.findByIdAndDelete(supId)
    .then(()=>{ //send respond(res) to frontend
        res.status(200).send({status:"supplier deleted"});
    }).catch((err)=>{
        res.status(500).send({status:"error with delete supplier", error:err.message});
    })

})

//checking email when registering
router.get("/check-email/:email",async (req, res) => {
    const { email } = req.params;
    try {
      const existingSupplier = await Supplier.findOne({ email: email });
      if (existingSupplier) {
        res.status(400).send('Email already exists');
        
      } else {
        
        res.send('Email available');
        
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

//adding suppliers registered data to database
router.route("/add").post((req,res)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const company=req.body.company;
    const experience=req.body.experience;
    const medicine_type=req.body.medicine_type;
    const gender=req.body.gender;
    const phone_number=req.body.phone_number;
    const password=req.body.password;
    const re_type_pass=req.body.re_type_pass;
    const accept_terms=req.body.accept_terms;


    const newSupplier = new Supplier({

        name,
        email,
        company,
        experience,
        medicine_type,
        gender,
        phone_number,
        password,
        re_type_pass,
        accept_terms

    })

    newSupplier.save().then(()=>{
        res.json("Supplier added")//if success
    }).catch((err)=>{//if not success
        console.log(err);
    })

})

 // add accpet registered suppliers to new database
router.route("/addRegSuppliers").post(async (req,res)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const company=req.body.company;
    const experience=req.body.experience;
    const medicine_type=req.body.medicine_type;
    const phone_number=req.body.phone_number;
    const password=req.body.password;
  
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);


    const regSupplier = new regSuppliers({

        name,
        email,
        company,
        experience,
        medicine_type, 
        phone_number,
        password: hashedPassword
        

    });

    

    regSupplier.save().then(()=>{
        res.json("Supplier added")//if success
    }).catch((err)=>{//if not success
        console.log(err);
    })
    res.status(201).json({ message: 'User created successfully' });
}catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

}

});

//view 
router.route("/").get((req,res)=>{

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:id").put(async(req,res)=>{
    let supId = req.params.id;//fetch id comming from url
    const {name,age,gender}=req.body;//getting data from req.body for updating

    const updateSupllier = {//create a object with nedd to be update data
        name,
        age,
        gender
    }

    const update = await Supplier.findByIdAndUpdate(supId,updateSupllier).then(()=>{
        res.status(200).send({status: "Supplier updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with updating data",error: err.message});
 
    })
})


//delete
router.route("/delete/:id").delete(async(req,res)=>{//giving url to identify what is want to delete 
    let supId=req.params.id;//getting supllier id from url
    await Supplier.findByIdAndDelete(supId)
    .then(()=>{ //send respond to frontend
        res.status(200).send({status:"supplier deleted"});
    }).catch((err)=>{
        res.status(500).send({status:"error with delete supplier", error:err.message});
    })

})

//fetch one supplier
router.route("/get/:id").get(async(req,res)=>{
    let supId=req.params.id;
    const sup = await Supplier.findById(supId).then((supplier)=>{
        res.status(200).send({status:"supplier fetched",supplier})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user"});

    })
})


module.exports=router;
