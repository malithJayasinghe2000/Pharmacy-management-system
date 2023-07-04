const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Sent', 'Failed'],
    required: true
  }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
