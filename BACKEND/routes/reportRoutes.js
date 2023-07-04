const express = require('express');
const Report = require('../models/report');
const regSuppliers = require('../models/regSuppliers')
const Order = require('../models/orders')
const router = express.Router();

router.route("/deleteReports/:id").delete(async(req,res)=>{//giving url to identify what is want to delete (for that giving id)
  let orderId=req.params.id;//getting supllier id from url
  await Report.findByIdAndDelete(orderId)
  .then(()=>{ //send respond
      res.status(200).send({status:"order deleted"});
  }).catch((err)=>{
      res.status(500).send({status:"error with delete order", error:err.message});
  })

})


router.get('/getSupplierNameByReport/:reportId', async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find the report by report ID
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Get the supplier ID from the report
    const supplierId = report.supplier;

    // Find the supplier by supplier ID
    const supplier = await regSuppliers.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    // Return the supplier name
    res.json({ supplierName: supplier.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get reports by supplier ID
// router.get('/bySupplier/:supplierId', async (req, res) => {
//   try {
//     const reports = await Report.find({ supplier: req.params.supplierId }).populate('order');
//     res.json(reports);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// GET reports for a specific supplier
router.get('/viewReports/:supplierId', async (req, res) => {
  const { supplierId } = req.params;
  try {
    const reports = await Report.find({ supplier: supplierId });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});





router.post('/sendOrder', async (req, res) => {
    try {
      const { supplierId, orderId } = req.body;
  
      // Get supplier details
      const supplier = await regSuppliers.findById(supplierId);
  
      // Get order details
      const order = await Order.findById(orderId);
  
      // Create report object
      const report = new Report({
        supplier: supplier._id,
        order: order._id,
        quantity:order.quantity,
        product_name:order.product_name,
        date: new Date(),
        status: 'Sent'
      });
  
      // Save report to database
      const savedReport = await report.save();
  
      res.json(savedReport);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
  

 
  