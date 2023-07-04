const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const declineReasonSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      },
      supplierName: {
        type: String,
        ref: 'Supplier',
        required: true
      },
      productName: {
        type: String,
        ref: 'Order',
        required: true
      },
      declineDate: {
        type: Date,
        required: true
      },
      declineReason: {
        type: String,
        required: true
      }
});

const declineReaon = mongoose.model('Decline', declineReasonSchema);

module.exports = declineReaon;
