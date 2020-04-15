const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const booking = new Schema ({
  message: {
    type: String
  },
  property_id: {
    type: Schema.Types.ObjectId,
    ref : 'property'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref : 'users'
  }
});

var Booking= mongoose.model('booking', booking);
module.exports = Booking;
