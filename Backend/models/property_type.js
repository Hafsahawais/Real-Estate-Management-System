const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

property_type = new Schema({
  title: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'agricultural']
  },
  is_active: {
    type: Boolean,
    default: true
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  createdOn: {
    type: Date
  }
});

var Property_Type = mongoose.model('property_type', property_type);
module.exports = Property_Type;
