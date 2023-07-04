const express = require('express');
const router = express.Router();
const DeclineReason = require('../models/declineReason');
const Report = require('../models/report');
const regSuppliers = require('../models/regSuppliers');

//display all

router.get('/all-decline-reasons', async (req, res) => {
  try {
    const declinedReasons = await DeclineReason.find().exec();
    res.status(200).json(declinedReasons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;

router.post('/decline-reasons', async (req, res) => {
  try {
    // Extract data from the request body
    const { orderid, declineDate, declineReason } = req.body;

    // Find the report associated with the order
    const report = await Report.findOne({ order: orderid }).exec();

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Get the supplier ID from the report
    const supplierId = report.supplier;

    // Find the supplier associated with the report
    const supplier = await regSuppliers.findOne({ _id: supplierId }).exec();

    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    // Create a new decline reason document
    const declineReasonData = new DeclineReason({
      orderId: orderid,
      supplierName: supplier.name,
      productName: report.product_name,
      declineDate,
      declineReason
    });

    // Save the decline reason to the database
    await declineReasonData.save();

    res.status(201).json(declineReasonData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Route to get the decline reason and supplier name based on the orderId
router.get('/declineReason/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Retrieve the report with the orderId
    const report = await Report.findOne({ order: orderId }).exec();

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Retrieve the supplier name using the supplierId from the report
    const supplier = await regSuppliers.findOne({ _id: report.supplier }).exec();

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Create a decline reason object
    const declineReason = new declineReason({
      orderId: report.order,
      supplierName: supplier.name,
      productName: report.product_name,
      declineDate: new Date(),
      declineReason: ''
    });

    // Save the decline reason object to the database
    const savedDeclineReason = await declineReason.save();

    res.status(200).json(savedDeclineReason);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
