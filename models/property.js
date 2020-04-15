const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const property = new Schema ({
  address: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // required: true
  },
  property_type_id: {
    type: Schema.Types.ObjectId,
    ref: 'property_type'
  },
  user_id : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'project'
  }
});

var Property = mongoose.model('property', property);

module.exports = Property;
