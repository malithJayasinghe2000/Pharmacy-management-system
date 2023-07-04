const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const regSuppliers = require('../models/regSuppliers');

router.post('/login', async (req, res) => {
  let supId=req.params.id;
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await regSuppliers.findOne({ email });

    if (user) {
      console.log('user found')
    }

    // If user is not found, return an error message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password provided with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const { _id, name, email, phone } = user;
    
      
      console.log('password matching');
      // Send supplier's details to the client
      res.status(200).json({ supId: _id, name, email, phone });
    }
    

    // If the passwords don't match, return an error message
    if (!isMatch) {
      return res.status(400).json({ message: 'password not matching' });
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    
  }
});


// POST route for resetting password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the supplier with the specified email
    const supplier = await regSuppliers.findOne({ email });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // TODO: Generate a password reset token and send it to the supplier's email address
    // You can use a library like nodemailer to send the email with the password reset link/token

    res.status(200).json({ message: "Password reset link has been sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reset password. Please try again later." });
  }
});



module.exports = router;
