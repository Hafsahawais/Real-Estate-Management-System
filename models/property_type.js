const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const property_type = ({
  description: {
    type: String,
    required: true
  }
});

var Property_Type = mongoose.model('property_type', property_type);
module.exports = Property_Type;
