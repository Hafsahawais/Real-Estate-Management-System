const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const payment = new Schema ({
  booking_id : {
    type: Schema.Types.ObjectId,
    ref: 'booking'
  },
  payment_type : {
    type: Schema.Types.ObjectId,
    ref: 'payment_type'
  },
  reference_no: {
    type: String,
  }
});

var  Payment = mongoose.model('payment', payment);
module.exports = Payment;
