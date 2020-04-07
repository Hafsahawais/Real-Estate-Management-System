const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const payment_type = new Schema ({
  description: {
    type: String,
    required: true
  }
});

var Payment_Type = mongoose.model('payment_type', payment_type);
module.exports = Payment_Type;
