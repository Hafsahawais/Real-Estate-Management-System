var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Property = mongoose.model('property', new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  propertyFor: {
    type: String,
    required: true,
    default: 'sell',
    enum: ['sell', 'rent']
  },
  description: {
    type: String
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'property_type'
  },
  city: {
    type: String
  },

  length: {
    type: Number,
    required: true
  },
  breadth: {
    type: Number,locality: {
      type: String,
      required: true
    },
    required: true
  },
  cornrPlot: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  phoneNo: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  isActive: {
    type: Boolean,
    default: true
  },
  slug : {
    type: String,
    required: true
  },
  images: {
    type: [String]
  },
  imgPath: {
    type: String
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  },
  createdOn: {
    type: Date,
    default: Date.now()
  }
}) );

module.exports = Property;
