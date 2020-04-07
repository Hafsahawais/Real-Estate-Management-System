const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const booking = new Schema ({
  property_id: {
    type: Schema.Types.ObjectId,
    ref : 'property'
  }
});

var Booking= mongoose.model('booking', booking);
module.exports = Booking;
